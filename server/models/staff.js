const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const transform = require('../utils/transform')

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
    isManager: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
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
    image: String,
    expireAt: {
        type: Date,
        index: { expires: 60*60*24*30, partialFilterExpression: { isDeleted: true } }
    }
})

staffSchema.set('toJSON', {transform: transform.toJSON})
staffSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Staff", staffSchema)