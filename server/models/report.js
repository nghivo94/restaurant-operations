const mongoose = require('mongoose')
const transform = require('../utils/transform')

const reportSchema = new mongoose.Schema({
    toChange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffChange",
        required: true
    },
    reporterName: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    message: String,
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60*60*24*30 }
    }
})

reportSchema.set('toJSON', transform.toJSON)

module.exports = mongoose.model("Report", reportSchema)