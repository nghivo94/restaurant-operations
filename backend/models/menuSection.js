const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const transform = require('../utils/transform')

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

menuSectionSchema.set('toJSON', {transform: transform.toJSON})
menuSectionSchema.plugin(uniqueValidator)

module.exports = mongoose.model("MenuSections", menuSectionSchema)