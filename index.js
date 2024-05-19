const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 3000;
const saltRounds = 10
var jwt = require('jsonwebtoken');

app.use(express.json())

// new user registration
app.post('/user', async (req, res) => {
  // check if username already exist ??
  let existing = await client.db("instagram").collection("account").findOne({
    username: req.body.username
  })

  if (existing) {
    res.status(400).send("username already exist")
  } else {
    // insertOne the registration data to mongo
    const hash = bcrypt.hashSync(req.body.password, 10);

    let result = await client.db("instagram").collection("account").insertOne(
      {
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email
      }
    )
    res.send(result)
  }
})

app.post('/login', async (req, res) => {
  // step #1: req.body.username ??
  if (req.body.username != null && req.body.password != null) {
    let result = await client.db("instagram").collection("account").findOne({
      username: req.body.username
    })

    if (result) {
      // step #2: if user exist, check if password is correct
      if (bcrypt.compareSync(req.body.password, result.password) == true) {
        // password is correct
        var token = jwt.sign(
          { _id: result._id, username: result.username },
           'osnfonsfnewif'
          );
        res.send(token)
      } else {
        // password is incorrect
        res.status(401).send('wrong password')
      }

    } else {
      // step #3: if user not found
      res.status(401).send("username is not found")
    }
  } else {
    res.status(400).send("missing username or password")
  }
})

// get user profile
app.get('/user/:siapadia/:emaildia', async (req, res) => {
  // findOne

  let token = req.headers.authorization.split(' ')[1]

  let decoded = jwt.verify(token, 'password')

  if (decoded._id != req.params.id) {
    
  }

  let result = await client.db('instagram').collection('collection').findOne({
    username: req.params.siapadia,
    email: req.params.emaildia
  })
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

function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(` `)[1]

  if (token == null) return res.sendStatus(401)

    jwt.verify(token, "posakdpojsa", (err, decoded) => {
      console.log(err)

      if (err) return res.sendStatus(403)

        req.identity = decoded

        next()
    })

}

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