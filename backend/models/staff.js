const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const toJSON = require('./toJSON')

const staffSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isManager: Boolean,
    firstName: {
        type: String,
        required: [true, "First name is missing!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is missing!"]
    },
    email: String,
    phoneNumber: String,
    image: String
})

staffSchema.set('toJSON', {transform: toJSON})
staffSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Staff", staffSchema)