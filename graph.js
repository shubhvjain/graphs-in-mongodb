const MongoClient = require('mongodb').MongoClient;

class mGraph {
    constructor(graphName, options = {}) {
        let requiredOptions = ["dbURL", "dbName", "collection"]
        let validOptions = []
        this.graphName = graphName
        if (!options.dbURL) { throw new Error("Specify MongoDB URL") }
        if (!options.dbName) { throw new Error("Specify MongoDB Database name") }
        if (!options.collection) { throw new Error("Specify MongoDB collection") }

        this.dbName = options.dbName
        this.dbURL = options.dbURL
        this.collection = options.collection
        this.defaultMongoOptions = { useUnifiedTopology: true }

        // config for  simple unidirected graph
        this.graph = {}
        this.graph.directed = false
        this.graph.multiEdges = false
        this.graph.loops = false

        console.log("Graph type : " + this.getGraphType())
        console.log("Starting connection.....")
        MongoClient.connect(this.dbURL, this.defaultMongoOptions, function (err, client) {
            console.log("....connected successfully to server")
        });
    }
    getGraphType() {
        let graphType = ""
        graphType += this.graph.multiEdges ? "muti" : "simple"
        graphType += this.graph.directed ? "-directed " : "-undirected "
        graphType += this.graph.loops ? "-withLoops" : ""
        return graphType
    }
    async addEdge(node1, node2, options = {}) {
        try {
            // node1-----(options)-----node2
            // check if loops are allowed 
            if (!this.graph.loops) {
                let isSame = node1.id == node2.id && node1.collection == node2.collection
                if (isSame) { throw new Error("Loops not allowed in " + this.getGraphType() + " graph") }
            }

            let client = await MongoClient.connect(this.dbURL, this.defaultMongoOptions);
            let db = client.db(this.dbName)

            let newEdge = {
                graphName: this.graphName,
                node1: { id: node1.id, collection: node1.collection },
                node2: { id: node2.id, collection: node2.collection }
            }

            // check if mulitple edges allowed
            if (!this.graph.multiEdges) {
                let searchRecords = await db.collection(this.collection).find(newEdge).toArray()
                if (searchRecords.length > 0) {
                    throw new Error("Multiple edges between 2 vertices not allowed in " + this.getGraphType() + " graph")
                }
            }

            if (!this.graph.directed) {
                let reverseNode = {
                    graphName: this.graphName,
                    node1: { id: node2.id, collection: node2.collection },
                    node2: { id: node1.id, collection: node1.collection }
                }
                let searchReverse = await db.collection(this.collection).find(reverseNode).toArray()
                if (searchReverse.length > 0) {
                    throw new Error("This node already exists in the  " + this.getGraphType() + " graph")
                }
            }

            // add edge in the graph 
            newEdge["label"] = this.convertToCC(options.label ? options.label : "")
            newEdge["meta"] = {
                addedOn: new Date(),
                originalLabel: options.label ? options.label : ""
            }
            newEdge["data"] = options["data"] ? options["data"] : {}
            console.log(newEdge)
            await db.collection(this.collection).insertOne(newEdge)
            // db.close();
            return newEdge
        } catch (error) {
            throw error
        }
    }
    convertToCC(str) {
        // https://stackoverflow.com/a/2970667
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

}
module.exports = mGraph