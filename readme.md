Graphs are really powerful data structures. They help us capture relationships between different objects. In this project, I have tried to store  different types of graphs that relate documents stored inside MongoDB database. These relations are stored as edges inside a collection.

**How are graphs stored ?**
The edge connecting 2 nodes  is stored. The nodes of this graphs are 2 JSON documents stored in the database (in any collection)

  
### Creating a new graph

Create a new instance of the `mGraph` class.

`let g = new mGraph("graphname",{ ...options })`

List of `options` :
- `dbURL` (required) : MongoDB connection URI string
- `dbName` (required) : Database name
- `collection` (required) : Name of the collection in the selected database in which the graph will be stored. Note that you can store multiple graphs in a single collection

By default, the graphs created are `simple-undirected-without loops`. However, other types of graphs are supported too. 

**How to decide which type of graph you want and how to create that graph ?** 

You must answer the following 3 questions to understand the structure of the graph - 
- Are edges directed or undirected ? (based on that set `directed` to `true/false` )
    ![Directed vs Undirected](/docs/direction.png)
- Do you want multiple edges between same pair of vertices ? (set `multiEdges` to `true/false` accordingly )
    ![multi-edges](/docs/multipleEdge.png)
- Are loops present in your graph ? (if yes, set `loops` to `true`)

    ![loop](/docs/loop.png)


By defualt, all the above flags are `false` (which make the default graph to be undircected, simple , without loops)

Example : 

```{js}
let graph1 = new mGraph("graph_name", {
            dbURL: process.env.MONGO_DB_URL,
            dbName: "graph1",
            collection: "knowledge1"
        })
```

### API
---

Note : Throughtout the APIs, `node1` and `node2` are the  2 nodes that an edge joins. Each edge in the graph has an unique `edgeID` 

**Inserting an edge**
```{js}
let newEdge = async graph1.addEdge(node1, node2, options = {})
```

**Updating an edge**
```{js}
await graph1.editEdge("edgeID",{data:{msg:"Updated message"}})
```

**Deleting an edge**
```{js}
await graph1.deleteEdge("edgeID")
```

**Get complete graph**
```{js}
let allEdges = await graph1.getGraph()
```

**Getting neighbours of a vertex**
```{js}
TODO
```

**Getting degree of a vertex**
```{js}
TODO
```

**Getting the type of graph**
```{js}
getGraphType()
```




### Graph reference

- [Rosen, Kenneth H., and Krithivasan, Kamala. Discrete Mathematics and Its Applications: With Combinatorics and Graph Theory. India, McGraw-Hill Companies, 2012.](https://www.google.co.in/books/edition/Discrete_Mathematics_and_Its_Application/C2c6twAACAAJ?hl=en) 
