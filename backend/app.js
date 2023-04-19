const express = require('express')
const cors = require('cors')
const routes = require('./routes')

// Make an express app
const app = express()
const port = 4001

// Use middlewares
app.use(cors())
app.use(express.static(`${__dirname}/public`))
app.use('/api', routes)

app.listen(port, () => console.log(`Express app is running on port: ${port}`))

module.exports = app
