const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const toJSON = require('./toJSON')

const tableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    floor: {
        type: Number,
        required: true
    },
    location: String
})

tableSchema.set('toJSON', {transform: toJSON})
tableSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Tables", tableSchema)