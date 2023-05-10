const mongoose = require('mongoose')
const transform = require('../utils/transform')

const reportSchema = new mongoose.Schema({
    toChange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffChange"
    },
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    },
    timeStamp: {
        type: Date,
        default: new Date()
    },
    message: String,
    expireAt: {
        type: Date,
        default: new Date(),
        index: { expires: 60*60*24*30 }
    }
})

reportSchema.set('toJSON', transform.toJSON)

module.exports = mongoose.model("Report", reportSchema)