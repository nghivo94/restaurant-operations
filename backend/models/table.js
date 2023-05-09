const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const transform = require('../utils/transform')

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

tableSchema.set('toJSON', {transform: transform.toJSON})
tableSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Tables", tableSchema)