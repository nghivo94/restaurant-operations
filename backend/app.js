const express = require('express')
require('express-async-errors')
const cors = require('cors')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const app = express()
app.use(express.json())
app.use(cors)