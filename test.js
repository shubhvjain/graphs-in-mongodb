let mGraph = require("./graph")
pt = (obj)=>{
    console.log(JSON.stringify(obj,null,2))
}
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
        // let edges1 = await  graph1.adjacentNodes({id:"5feed9da1422dcf1ea1e9033",collection:"cities"})
        // pt(edges1)
    //    let delEdge = await graph1.deleteEdge("5feef9c4dda839f6dfe2cf74")
    //    console.log(delEdge)
   //  graph1.editEdge("5fef01d52d6fc9f7c3971c28",{data:{msg:"yeah ...it works...hello"}})
        let graph2 = new mGraph("destinations", {
            dbURL: process.env.MDB,
            dbName: "graph1",
            collection: "knowledge1"
        })

        let a = await graph1.getGraph()
        console.log(JSON.stringify(a,null,2))

       //  let deg = await graph1.getDegree({"id":"5feed9da1422dcf1ea1e9031","collection":"cities"})
       //  graph1.addEdge({id:"5feed9da1422dcf1ea1e9032","collection":"cities"},{id:"5feed9da1422dcf1ea1e9031","collection":"cities"},{"label":"Some road"})
       //  console.log(deg)
       //  console.log(deg)

    } catch (error) {
        console.log("error.....")
        console.log(error)
    }
}

main()
