const MongoClient = require('mongodb').MongoClient;


class mGraph {
    constructor(graphName, options = {}) {
        let requiredOptions = ["dbURL", "dbName", "collection"]
        let validOptions = []
        this.graphName = graphName
        if (!options.dbURL) { throw new Error("Specify MongoDB URL") }
        if (!options.dbName) { throw new Error("Specify MongoDB Database name") }
        if (!options.collection) { throw new Error("Specify MongoDB Database name") }

        this.dbName = options.dbName
        this.dbURL = options.dbURL
        this.collection = options.collection

        // config for  simple unidirected graph
        this.graph = {}
        this.graph.directed = false
        this.graph.multiEdges = false
        this.graph.loops = false

        console.log("Graph type : " + this.getGraphType())
        console.log("Starting connection.....")
        MongoClient.connect(this.dbURL, { useUnifiedTopology: true }, function (err, client) {
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
    
}

 main = async ()=>{
    try {
        let graph1 = new mGraph("roadmap", {
            dbURL: process.env.MDB,
            dbName: "graph1",
            collection: "knowledge1"
        })
    } catch (error) {
        console.log("error.....")
        console.log(error)
    }    
}

main()
