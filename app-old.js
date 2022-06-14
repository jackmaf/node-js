const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('mi primer proyecto de node con express :D')
})

app.listen(3000)