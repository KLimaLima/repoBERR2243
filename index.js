const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = process.env.PORT || 3000;
const saltRounds = 10
var jwt = require('jsonwebtoken');

app.use(express.json())

app.post('/register', async (req, res) => {

  let username = req.body.username
  let password = req.body.password

  if (!username | !password) {
    res.send("There's some undefined field!\nPlease give a username and password")
    return
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds)

  let user = await client.db('instagram').collection('account').findOne(
    { username: username }
  )

  if (user) {
    res.send('Username is already taken')
    return
  }

  let result = await client.db('instagram').collection('account').insertOne(
    {
      username: username,
      password: hashedPassword,
    }
  )

  if (result) {
    res.send('Successfully registered user')
  } else {
    res.send('Failed to register user. Please try again')
  }

})

app.get('/login', async (req, res) => {

  let username = req.body.username
  let password = req.body.password

  if (!username | !password) {
    res.send("There's some undefined field!\nPlease give a username and password")
    return
  }

  let result = await client.db('instagram').collection('account').findOne(
    { username: username }
  )

  if (!result) {
    res.send('User not found')
    return
  }

  let checkPassword = bcrypt.compareSync(password, result.password)

  if (checkPassword) {
    res.send(`Successfully login ${result.username}!\n`)
  } else {
    res.send('Incorrect password')
  }

})

app.patch('/change_password', async (req, res) => {

  let username = req.body.username
  let password = req.body.password
  let newPassword = req.body.newPassword

  if (!username| !password| !newPassword) {
    res.send("There's some undefined field!\nPlease give a username, password and a new password")
    return
  }

  let user = await client.db('instagram').collection('account').findOne(
    { username: username }
  )

  if (!user) {
    res.send('Could not find user')
    return
  }

  let checkPassword = bcrypt.compareSync(password, user.password)

  if (!checkPassword) {
    res.send('Incorrect password')
    return
  }

  if (password == newPassword) {
    res.send('New password cannot be same as old password')
    return
  }

  const hashedPassword = bcrypt.hashSync(newPassword, saltRounds)

  let result = await client.db('instagram').collection('account').updateOne(
    { username: username },
    { $set: { password: hashedPassword } }
  )

  if (result) {
    res.send('Successfully updated user password')
  } else {
    res.send('Failed to update user password')
  }

})

app.delete('/delete_account', async (req, res) => {

  let username = req.body.username
  let password = req.body.password

  if (!username| !password) {
    res.send("There's some undefined field!\nPlease give a username and password")
    return
  }

  let user = await client.db('instagram').collection('account').findOne(
    { username: username }
  )

  if (!user) {
    res.send('User does not exist')
    return
  }

  let checkPassword = bcrypt.compareSync(password, user.password)

  if (!checkPassword) {
    res.send('Incorrect password')
    return
  }

  let result = await client.db('instagram').collection('account').deleteOne(
    { username: username }
  )

  if (result) {
    res.send('Successfully deleted user')
  } else {
    res.send('Failed to delete user')
  }

})

// app.get('/', async (req, res) => {
  
//   let Nama2NakGet = await client.db('instagram').collection('food').find().toArray()

//   res.send(Nama2NakGet)

// })

// app.post('/', async (req, res) => {

//   let NamaYgNakPost = req.body.name

//   let getAllDocuments = await client.db('instagram').collection('food').insertOne(
//     {
//       name: NamaYgNakPost
//     }
//   )
  
// })

// app.patch('/', async (req, res) => {
 
//   let NamaYgNakPatch = req.body.name //lollipop
//   let typeYgNakMasukkan = req.body.type //gula

//   let getAllDocuments = await client.db('instagram').collection('food').updateOne(
//     { name: NamaYgNakPatch },
//     { $push:{ ingredient : { type : typeYgNakMasukkan} } }
//   )
// })

// app.delete('/', async (req, res) => {

//   let NamaYgNakDelete = req.body.name //lollipop

//   let getAllDocuments = await client.db('instagram').collection('food').deleteOne(
//     {
//       name: NamaYgNakDelete //lolipop
//     }
//   )

// })

// // new user registration
// app.post('/user', async (req, res) => {
//   // check if username already exist ??
//   let existing = await client.db("instagram").collection("account").findOne({
//     username: req.body.username
//   })

//   if (existing) {
//     res.status(400).send("username already exist")
//   } else {
//     // insertOne the registration data to mongo
//     const hash = bcrypt.hashSync(req.body.password, 10);

//     let result = await client.db("instagram").collection("account").insertOne(
//       {
//         username: req.body.username,
//         password: hash,
//         name: req.body.name,
//         email: req.body.email
//       }
//     )
//     res.send(result)
//   }
// })

// app.post('/login', async (req, res) => {
//   // step #1: req.body.username ??
//   if (req.body.username != null && req.body.password != null) {
//     let result = await client.db("instagram").collection("account").findOne({
//       username: req.body.username
//     })

//     if (result) {
//       // step #2: if user exist, check if password is correct
//       if (bcrypt.compareSync(req.body.password, result.password) == true) {
//         // password is correct
//         var token = jwt.sign(
//           { _id: result._id, username: result.username },
//            'osnfonsfnewif'
//           );
//         res.send(token)
//       } else {
//         // password is incorrect
//         res.status(401).send('wrong password')
//       }

//     } else {
//       // step #3: if user not found
//       res.status(401).send("username is not found")
//     }
//   } else {
//     res.status(400).send("missing username or password")
//   }
// })

// // get user profile
// app.get('/user/:siapadia/:emaildia', async (req, res) => {
//   // findOne

//   let token = req.headers.authorization.split(' ')[1]

//   let decoded = jwt.verify(token, 'password')

//   if (decoded._id != req.params.id) {
    
//   }

//   let result = await client.db('instagram').collection('collection').findOne({
//     username: req.params.siapadia,
//     email: req.params.emaildia
//   })
//   res.send(result)
// })

// app.get('/', (req, res) => {
//   res.send('Khai was here')
// })

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

    // let testSubject2 = await client.db(`sample_analytics`).collection(`customers`).findOne(
    //   {name: "Leslie Martinez"}
    // )

    // console.log(testSubject2)

    // let testSubject = await client.db(`sample_analytics`).collection(`customers`).aggregate(
    //   [
    //     {
    //       '$match': {
    //         'name': 'Leslie Martinez'
    //       }
    //     }, {
    //       '$lookup': {
    //         'from': 'accounts', 
    //         'localField': 'accounts', 
    //         'foreignField': 'account_id', 
    //         'as': 'accounts'
    //       }
    //     }
    //   ]
    // ).toArray()

    // console.log("Result:")
    // console.log(testSubject)

  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
///////////////////////////////////////////////////////////////////////////////////////////////