const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const transform = require('../utils/transform')

const sideItemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mainItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem"
    }]
})

sideItemSchema.set('toJSON', {transform: transform.toJSON})
sideItemSchema.plugin(uniqueValidator)

module.exports = mongoose.model("SideItem", sideItemSchema)