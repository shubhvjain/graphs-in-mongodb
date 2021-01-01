const MongoClient = require('mongodb').MongoClient;


class mGraph {
    constructor(dbName, graphName, options = {}) {
        let requiredOptions = ["dbURL"]
        let validOptions = []
        this.dbName = dbName
        this.graphName = graphName
        if (!options.dbURL) { throw new Error("Specify MongoDB URL") }
        this.dbURL = options.dbURL
        console.log("Starting connection.....")
        let obj = this
        MongoClient.connect(this.dbURL, { useUnifiedTopology: true }, function (err, client) {
            console.log("....Connected successfully to server");
            // console.log(client)
            obj.db = client.db(obj.dbName);
            obj.connect = true;
        });
    }
}


try {
    let graph1 = new mGraph("graph1", "roadmap", { dbURL: process.env.MDB })
} catch (error) {
    console.log("Errororor")
    console.log(error)
}
