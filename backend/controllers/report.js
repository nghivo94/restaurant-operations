const middleware = require('../utils/middleware')
const StaffChange = require('../models/staffChange')
const Report = require('../models/report')

const reportRouter = require('express').Router()

reportRouter.get('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const user = request.user
    if (!user || !user.isManager) {
        return response.status(401).json({ error: "not authorized to see reports" })
    }
    const reports = await Report.find({})
    response.json(reports)
})

reportRouter.get('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const user = request.user
    if (!user || !user.isManager) {
        return response.status(401).json({ error: "not authorized to see reports" })
    }
    const report = await Report.findById(request.params.id)
    if (!report) {
        return response.status(404).end()
    }
    response.json(report)
})

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

module.exports = reportRouter