const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const toJSON = require('./toJSON')

const menuSectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subSections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuSections"
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItems"
    }]
})

menuSectionSchema.set('toJSON', {transform: toJSON})
menuSectionSchema.plugin(uniqueValidator)

module.exports = mongoose.model("MenuSections", menuSectionSchema)