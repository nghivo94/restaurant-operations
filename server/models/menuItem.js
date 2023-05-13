const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const transform = require('../utils/transform')

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuSection"
    }],
    configurations: {
        type: Object
    },
    sideItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SideItem"
    }]
})

menuItemSchema.set('toJSON', {transform: transform.toJSON})
menuItemSchema.plugin(uniqueValidator)

module.exports = mongoose.model("MenuItem", menuItemSchema)