const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId  } = require("mongodb");
const { query } = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ui8slz3.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const showCollection = client.db("movieTicket").collection("shows");

    // get all shows
		app.get("/shows", async (req, res) => {
			const query = {};
			const cursor = showCollection.find(query);
			const result = await cursor.toArray();
			res.send(result);
			console.log(result);
		});
        // get specific shows by id
        app.get("/shows/:id", async (req, res) => {
			const id = req.params.id;
            if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
                return res.status(400).send('Invalid ID');
              }
            
			const result = await showCollection.findOne({ _id: new ObjectId(id) });
			res.send(result);
		});
        app.get("/booking/:id", async (req, res) => {
			const id = req.params.id;
            
			const result = await showCollection.findOne({ _id: new ObjectId(id) });
			res.send(result);
		});

        

        
  } finally {
    
  }
}
run().catch((err)=>console.log(err));
app.get('/', (req, res)=>{
    res.send('movie ticket server is running')
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})