const StaffChange = require('../models/staffChange')
const staffChangeRouter = require('express').Router()

staffChangeRouter.get('/', async (request, response) => {
    const user = request.user
    if (!user || !user.isManager) {
        return response.status(401).json({ error: "not authorized to see changes in staff' accounts" })
    }
    const staffChanges = await StaffChange
        .find({})
        .populate('toAccount')
        .populate('fromAccount')
        .populate('reports')
    response.json(staffChanges)
})

module.exports = staffChangeRouter