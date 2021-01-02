Graphs are really powerful data structures. They help up capture relationships between different objects. In this project, I have tried to store  different types of graphs that relate documents stored inside the database.

**How are graphs stored ?**
The edges connecting 2 nodes in a graph is stored. The nodes of this graphs are 2 JSON documents stored in the database (in any collection)

  
### Creating a new graph

Create a new instance of the `mGraph` class.

`let g = new mGraph("graphname",{ options })`

List of `options` :
- `dbURL` (`required`) : MongoDB connection URI string
- `dbName` (`required`) : Database name
- `collection` (`required`) : Name of the collection in the selected database in which the graph will be stored. Note that you can store multiple graphs in a single collection

Example : 

```{js}
let graph1 = new mGraph("graph_name", {
            dbURL: process.env.MONGO_DB_URL,
            dbName: "graph1",
            collection: "knowledge1"
        })
```

