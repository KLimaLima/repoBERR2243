const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Khai was here')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})