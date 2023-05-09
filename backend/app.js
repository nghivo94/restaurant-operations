const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.set('strictPopulate', false)

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const staffRouter = require('./controllers/staff')

const app = express()

app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/staff', staffRouter)

app.use(middleware.errorHandler)

module.exports = app