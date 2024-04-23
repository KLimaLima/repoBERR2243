const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 3000;
const saltRounds = 10

app.use(express.json())

app.get('/inc', async (req, res) => {
  let result = await client.db("instagram").collection("food").updateOne(
    {name: "Nasi Lemak"},
    {$inc: {price: 3}}
  )
})


app.get('/', (req, res) => {
  res.send('Khai was here')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//////////////////////////////////////////////////////////////////////////////////////////////

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://khairul:DatabaseKhairul@clusterberr2243.2vppqvg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBERR2243";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
///////////////////////////////////////////////////////////////////////////////////////////////