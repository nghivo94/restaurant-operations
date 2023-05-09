const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const mailService = require('../utils/mailService')
const staffRouter = require('express').Router()
const Staff = require('../models/staff')

const generateUsername = (firstName, lastName, code) => {
    const additionalCode = code ? code : Math.floor(Math.random() * 1000)
    return (`${firstName}${lastName}${additionalCode}`).toLowerCase()
}

const generatePassword = () => {
    return crypto.randomBytes(5).toString('hex')
}

staffRouter.get('/', async (request, response) => {
    const user = request.user
    if (!(user && user.isManager)) {
        return response.status(401).json({ error: "not authorized to see the information about all staff"})
    }
    const staff = await Staff.find({})
    response.json(staff)
})

staffRouter.post('/', async (request, response) => {
    const body = request.body
    const createdByManager = !(body.username && body.password)
    if (createdByManager) {
        const user = request.user

        if (!user) {
            return response.status(404).json({ error: "unknown account creator" })
        }
        if (!user.email) {
            return response.status(401).json({ error: "no valid contact method"})
        }
        if (!user.isManager) {
            return response.status(401).json({ error: "Not authorized to add new staff"})
        }
        body.username = generateUsername(body.firstName, body.lastName)
        body.password = generatePassword()
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const staff = new Staff({
        username: body.username,
        passwordHash: passwordHash,
        isManager: body.isManager || false,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        image: body.image
    })

    const savedStaff = await staff.save()
    if (createdByManager) {
        try {
            const accountInfo = {
                firstName: body.firstName,
                lastName: body.lastName,
                username: body.username,
                password: body.password
            }
            await mailService.sendMailOfStaffAdded(accountInfo, request.user.email, body.email)
        } catch (error) {
            await Staff.findByIdAndRemove(savedStaff._id)
            return response.status(500).json({ error: "error in sending mails of the newly created staff credentials"})
        }
    }
    response.status(201).json(savedStaff)
})

staffRouter.get('/:id', async (request, response) => {
    const user = request.user
    const staff = await Staff.findById(request.params.id)
    if (!staff) {
        return response.status(404).end()
    }
    if (!(user && (user.isManager || user._id.toString() === staff._id.toString()))) {
        return response.status(401).json({ error: "not authorized to see staff's information"})
    }
    response.json(staff)
})

staffRouter.put('/:id', async (request, response) => {
    const body = request.body
    const user = request.user
    const staff = await Staff.findById(request.params.id)
    if (!staff) {
        return response.status(404).end()
    }
    const selfChange = user._id.toString() === staff._id.toString()
    const managerChange = user.isManager
    if (!(selfChange || managerChange)) {
        return response.status(401).json({ error: "not authorized to make changes to staff's information"})
    }
    
    const usernameChange = !(staff.username === body.username)
    if (usernameChange) {
        return response.status(401).json({ error: "cannot change username"})
    }

    if (body.password) {
        if (managerChange && !selfChange) {
            return response.status(401).json({ error: "not authorized to change password"})
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const updatedStaff = await Staff.findByIdAndUpdate(request.params.id, {...body, passwordHash: passwordHash}, { new : true, runValidators: true })
        return response.json(updatedStaff)
    }
    
    if (body.isManager) {
        if (!managerChange) {
            return response.status(401).json({ error: "cannot change manager status"})
        }
    }
    if (!body.isManager && staff.isManager) {
        if (!selfChange) {
            return response.status(401).json({ error: "cannot remove manager status"})
        }
    }
    const updatedStaff = await Staff.findByIdAndUpdate(request.params.id, {...body, passwordHash: staff.passwordHash}, { new : true, runValidators: true })
    response.json(updatedStaff)
})

staffRouter.delete('/:id', async (request, response) => {
    const user = request.user
    if (!user || !user.isManager) {
        return response.status(401).json({ error: "not authorized to remove account" })
    }
    await Staff.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = staffRouter