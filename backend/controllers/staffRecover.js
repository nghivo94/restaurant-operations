const mailService = require('../utils/mailService')

const Staff = require('../models/staff')
const StaffChange = require('../models/staffChange')

const staffRecoverRouter = require('express').Router()

staffRecoverRouter.get('/', async (request, response) => {
    const user = request.user
    if (!(user && user.isManager)) {
        return response.status(401).json({ error: "not authorized to see the information about removed staff"})
    }
    const staff = await Staff.find({ isDeleted: true })
    response.json(staff)
})

staffRecoverRouter.get('/:id', async (request, response) => {
    const user = request.user
    if (!(user && user.isManager)) {
        return response.status(401).json({ error: "not authorized to see the information about removed staff"})
    }
    const removedStaff = await Staff.findById(request.params.id)
    if (!removedStaff) {
        return response.status(404).end()
    }
    response.json(removedStaff)
})

staffRecoverRouter.post('/:id', async (request, response) => {
    const user = request.user
    if (!(user && user.isManager)) {
        return response.status(401).json({ error: "not authorized to recover removed staff" })
    }
    const removedStaff = await Staff.findById(request.params.id)
    if (!removedStaff) {
        return response.status(404).end()
    }
    const recoveredStaff = await Staff.findByIdAndUpdate(request.params.id, { isDeleted: false }, { new: true })
    const change = new StaffChange({
        toAccount: recoveredStaff._id,
        fromAccount: user._id,
        description: "RECOVER"
    })
    const savedChange = await change.save()
    await mailService.sendMailOfStaffRecovered(
        savedChange.timeStamp, 
        recoveredStaff.username, 
        `${config.REPORT_LINK}/${savedChange._id.toString()}`,
        user.email, recoveredStaff.email)
    
    response.json(recoveredStaff)
})

module.exports = staffRecoverRouter