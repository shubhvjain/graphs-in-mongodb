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

By default, the graphs created are `simple-undirected-without loops`. However, other types of graphs are supported too. 

**How to decide which type of graph you want and how to create that graph ?** 

You must answer the following 3 questions to understand the structure of the graph - 
- Are edges directed or undirected ? (based on that set `directed` to `true/false` )
    ![Directed vs Undirected](/docs/direction.png)
- Do you want multiple edges between same pair of vertices ? (set `multiEdges` to `true/false` accordingly )
    ![multi-edges](/docs/multipleEdge.png)
- Are loops present in your graph ? (if yes, set `loops` to `true`)
    ![loop](/docs/loop.png)
(from Rosen, Kenneth H., and Krithivasan, Kamala. Discrete Mathematics and Its Applications: With Combinatorics and Graph Theory. India, McGraw-Hill Companies, 2012. )


By defualt, all the above flags are `false` (which make the default graph to be undircected, simple , without loops)

Example : 

```{js}
let graph1 = new mGraph("graph_name", {
            dbURL: process.env.MONGO_DB_URL,
            dbName: "graph1",
            collection: "knowledge1"
        })
```