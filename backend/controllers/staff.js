const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const config = require('../utils/config')
const staffRouter = require('express').Router()
const Staff = require('../models/staff')

const generateUsername = (firstName, lastName, code) => {
    const additionalCode = code ? code : Math.floor(Math.random() * 1000)
    return (`${firstName}${lastName}${additionalCode}`).toLowerCase()
}

const generatePassword = () => {
    return crypto.randomBytes(5).toString('hex')
}

const sendMailOfStaffAdded = async (creatorMail, firstName, lastName, username, password) => {
    const mailTransporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            user: config.BUSINESS_EMAIL,
            password: config.BUSINESS_EMAIL_PASSWORD
        }
    })

    const details = {
        from: config.BUSINESS_EMAIL,
        to: creatorMail,
        subject: "New staff added",
        html: `<p>New staff added by you:</p>
            <p>Name: ${firstName} ${lastName}</p>
            <p>Username: ${username}</p>
            <p>Password: ${password}</p>`
    }

    await mailTransporter.sendMail(details)
}

staffRouter.get('/', async (request, response) => {
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
            await sendMailOfStaffAdded(user.email, body.firstName, body.lastName, body.username, body.password)
        } catch (error) {
            await Staff.findByIdAndRemove(savedStaff._id)
            return response.status(500).json({ error: "error in sending mails of the newly created staff credentials"})
        }
    }
    response.status(201).json(savedStaff)
})

module.exports = staffRouter