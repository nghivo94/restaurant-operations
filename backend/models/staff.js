const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const toJSON = require('./toJSON')

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is missing!"]
    },
    email: String,
    phoneNumber: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isManager: Boolean
})

staffSchema.set('toJSON', {transform: toJSON})
staffSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Staff", staffSchema)