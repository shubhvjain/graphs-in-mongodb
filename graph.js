const MongoClient = require('mongodb').MongoClient;

class mGraph {
    constructor(graphName, options = {
        directed: false,
        multiEdges: false,
        loops: false
    }) {
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
        this.graph.directed = options.directed
        this.graph.multiEdges = options.multiEdges
        this.graph.loops = options.loops

        console.log("Graph type : " + this.getGraphType())
        // console.log("Starting connection.....")
        //MongoClient.connect(this.dbURL, this.defaultMongoOptions, function (err, client) {
            //     console.log("....connected successfully to server")
        //});
    }
    getGraphType() {
        /**
         *  Returns the type of graph. The graph type is determined using 3 options provided with the constructor : multiEdges,directed and loops
         */
        let graphType = ""
        graphType += this.graph.multiEdges ? "muti" : "simple"
        graphType += this.graph.directed ? "-directed" : "-undirected"
        graphType += this.graph.loops ? "-withLoops" : ""
        return graphType.trim()
    }
    async addEdge(node1, node2, options = {}) {
        try {
            // node1-----(options)-----node2
            // check if loops are allowed 
            if (!this.graph.loops) {
                // if loops are not allowed, both nodes cannot be same 
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
                // reject request if there cannot be mulitple edges between 2 nodes 
                let searchRecords = await db.collection(this.collection).find(newEdge).toArray()
                if (searchRecords.length > 0) {
                    throw new Error("Multiple edges between 2 vertices not allowed in " + this.getGraphType() + " graph")
                }
            }

            if (!this.graph.directed) {
                /**
                 *  if the graph is directed, node1--->node2 and node2--->node1 are different 
                 *  but for undirected graph node1---node2 and node2---node1 are same so only 1 should be stored  
                **/
                // checking if reverse graph already exists 
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
                docType: "graphEdge",
                addedOn: new Date(),
                originalLabel: options.label ? options.label : ""
            }
            newEdge["data"] = options["data"] ? options["data"] : {}
            console.log(newEdge)
            await db.collection(this.collection).insertOne(newEdge)
            return newEdge
        } catch (error) {throw error}
    }
    convertToCC(str) {
        //to convert a string into Camel case
        // https://stackoverflow.com/a/2970667
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    async getDegree(node) {
        // degree of a vertex in simple non directional , in-degree,out-degree vertex in case of directional graphs
        // node : id,collection
        let client = await MongoClient.connect(this.dbURL, this.defaultMongoOptions);
        let db = client.db(this.dbName)
        let query = {
            "$or": [
                {
                    "graphName": this.graphName,
                    "node1": {id: node.id,collection: node.collection}
                },
                {
                    "graphName": this.graphName,
                    "node2": {id: node.id, collection: node.collection}
                }
            ]
        }
        let searchEdges = await db.collection(this.collection).find(query).toArray()
        return {simpleDegree: searchEdges.length}
    }
    async editEdge(edgeId) {
        // to edit an edge , given edgeId

    }
    async deleteEdge(edgeId) {
        // to delete an edge between 2 nodes , edgeId required
    }
    async deleteEdge(node1, node2, label) {
        // to delete an edge between 2 nodes and the edge label
    }
    buildQuery(){
    }
    async adjacentNodes(node,level=1){
        // returns nodes adjacent to a given node 
        let adjEdges 
        return adjEdges
    }
    async showRelatedEdges(node) {
        // returns all edges related to the input node 
    }
    async showGraph(node) {
        // returns the full graph 
    }
}
module.exports = mGraph