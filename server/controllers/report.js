const middleware = require('../utils/middleware')
const StaffChange = require('../models/staffChange')
const Report = require('../models/report')

const reportRouter = require('express').Router()

reportRouter.post('/:change_id', async (request, response) => {
    const reportedChange = await StaffChange.findById(request.params.change_id)
    if (!reportedChange) {
        return response.status(404).json({ error: "unknown reported change" })
    }
    const report = new Report({
        toChange: reportedChange._id,
        reporterName: body.reporterName,
        message: body.message
    })
    const savedReport = await report.save()
    reportedChange.reports = reportedChange.reports.concat(savedReport._id)
    response.json(savedReport)
})

reportRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const user = request.user
    if (!user || !user.isManager) {
        return response.status(401).json({ error: "not authorized to resolve report." })
    }
    const updatedReport = await Report.findByIdAndUpdate(request.params.id, 
        { isResolved: request.body.isResolved })
    response.json(updatedReport)
})

module.exports = reportRouter