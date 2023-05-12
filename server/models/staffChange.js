const mongoose = require('mongoose')
const transform = require('../utils/transform')

const staffChangeSchema = new mongoose.Schema({
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }],
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60*60*24*30 }
    }
})

staffChangeSchema.set('toJSON', transform.toJSON)

module.exports = mongoose.model("StaffChange", staffChangeSchema)