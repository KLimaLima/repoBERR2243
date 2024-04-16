const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 3000;
const saltRounds = 10

app.use(express.json())

app.post('/user', async (req, res) => {

  const hash = bcrypt.hashSync(req.body.author, saltRounds)
  //insertOne the registration data to mongoDB
  let result = await client.db('sample_mflix').collection('subtitle').insertOne(
    {
      language: req.body.language,
      movie: req.body.movie,
      author: hash,
    }
  )
  res.send(result)
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

    // let result = await client.db('sample_mflix').collection('subtitle').insertOne(
    //   {
    //     language: 'Japanese',
    //     movie: 'Tokyo Drift',
    //     author: 'Kohei'
    //   }
    // )
    // console.log(result)

    // let subtitle = await client.db('sample_mflix').collection('subtitle').find().toArray()
    // console.log(subtitle)

    // let subtitle = await client.db('sample_mflix').collection('subtitle').find(
    //   {
    //     language: 'Malay'
    //   }
    // ).toArray()
    // console.log(subtitle)

    // let updated = await client.db('sample_mflix').collection('subtitle').updateOne(
    //   { movie: 'Your Name' },
    //   { $set:{
    //     author: 'Abu'
    //     }
    //   }
    // )
    // console.log(updated)

    // let deleted = await client.db('sample_mflix').collection('subtitle').deleteOne(
    //   {
    //     _id: new ObjectId('660b6d82639a5d19b19fde83')
    //   }
    // )
    // console.log(deleted)

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
///////////////////////////////////////////////////////////////////////////////////////////////