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
const reportRouter = require('./controllers/report')
const staffChangeRouter = require('./controllers/staffChange')
const staffRecoverRouter = require('./controllers/staffRecover')

const app = express()

app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use('/api/login', loginRouter)
app.use('/api/staff', middleware.tokenExtractor, middleware.userExtractor, staffRouter)
app.use('/api/report', reportRouter)
app.use('/api/staff-change', middleware.tokenExtractor, middleware.userExtractor, staffChangeRouter)
app.use('/api/staff-recover', middleware.tokenExtractor, middleware.userExtractor, staffRecoverRouter)

app.use(middleware.errorHandler)

module.exports = app