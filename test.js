let mGraph = require("./graph")
main = async () => {
    try {
        let graph1 = new mGraph("roadmap", {
            dbURL: process.env.MDB,
            dbName: "graph1",
            collection: "knowledge1"
        })
        // await graph1.addEdge(
        //     {id:"5feed9da1422dcf1ea1e9033",collection:"cities"},
        //     {id:"5feeeb571422dcf1ea1e904d",collection:"cities"},
        //     {label:"Golden Quadrilateral"}
        // )

        let graph2 = new mGraph("destinations", {
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
