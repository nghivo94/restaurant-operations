const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Staff = require('../models/staff')
const { response } = require('express')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await Staff.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: "invalid username or password"})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn: 60*60 }
    )

    response.status(200).json({ token: token, ...user })
})

loginRouter.post('/token', async (request, response) => {
    const user = request.user
    const token = request.token

    if (!(user && token)) {
        response.status(401).json({ error: "missing token" })
    }

    response.status(200).json({ token: token, ...user })
})

module.exports = loginRouter