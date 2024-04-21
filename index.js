const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 3000;
const saltRounds = 10

app.use(express.json())

app.post('/register', async (req, res) => {

  if (req.body.username != null && req.body.password != null) {
    
    let findSimilar = await client.db("instagram").collection("account").findOne(
      {
        username: req.body.username
      }
    )

    if (!findSimilar) {

      const hash = bcrypt.hashSync(req.body.password, saltRounds)

      let result = await client.db("instagram").collection("account").insertOne(
        {
          username: req.body.username,
          password: hash
        }
      )

      if (result) {
        res.send(`Successfully registered!`)
        console.log(`Inserted into DB\nusername: ${req.body.username}\npassword: ${req.body.password}`)
      } else {
        res. send(`Something went wrong! Please try again.`)
      }

    } else {
      res.send(`The username ${req.body.username} is already taken.`)    
    }

  } else {
    res.send(`Please enter a username and password.`)
  }

})

app.get(`/login`, async (req, res) => {

  let result = await client.db("instagram").collection("account").findOne(
    {
      username: req.body.username
    }
  )

  if (result) {
    if(bcrypt.compareSync(req.body.password, result.password) == true) {
      res.send(`Successfully login for ${result.username}`)
    } else {
      res.send(`Incorrect password!`)
    }
  } else {
    res.send(`Unable to find the username ${req.body.username}. Please register for new users.`)
  }

})
























// // app.post('/user', async (req, res) => {

// //   const hash = bcrypt.hashSync(req.body.author, saltRounds)
// //   //insertOne the registration data to mongoDB
// //   let result = await client.db('sample_mflix').collection('subtitle').insertOne(
// //     {
// //       language: req.body.language,
// //       movie: req.body.movie,
// //       author: hash,
// //     }
// //   )
// //   res.send(result)
// // })

// app.post('/login', async (req, res) => {

//   //////////////////////////////////////////////////////////////////////////////////////////
//     // step #1: req.body.username ??
//     if (req.body.username != null && req.body.password != null) {
//       let result = await client.db("maybank2u").collection("users").findOne({
//         username: req.body.username
//       })
  
//       if (result) {
//         // step #2: if user exist, check if password is correct
//         if (bcrypt.compareSync(req.body.password, result.password) == true) {
//           // password is correct
//           res.send("Welcome back " + result.name)
//         } else {
//           // password is incorrect
//           res.status(401).send('wrong password')
//         }
  
//       } else {
//         // step #3: if user not found
//         res.status(401).send("username is not found")
//       }
//     } else {
//       res.status(400).send("missing username or password")
//     }
// //////////////////////////////////////////////////////////////////////
//   if (req.body.movie != null && req.body.language != null) {
//     let result = await client.db('sample_mflix').collection('subtitle').findOne(
//       {
//         //movie: req.body.movie
//       }
//     )
//   }
//   //step #1: req.body.username
//   let result = await client.db('sample_mflix').collection('subtitle').findOne(
//     {
//       language: req.body.language
//     }
//   )

//   if (result) {
//     //step #2: if user exist
//     console.log('found:' + result.language)
//     //res.send('found')

//     if (bcrypt.compareSync(req.body.author, result.author) == true) {
//       console.log('successfully login')
//       res.send('successfully login')
//     }
//   } else {
//     //step #3: if user not found
//     console.log('not found: ' + req.body.language)
//     res.send('not found')
//   }

// })

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