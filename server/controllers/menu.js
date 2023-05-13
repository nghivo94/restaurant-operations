const MenuSection = require('../models/menuSection')
const MenuItem = require('../models/menuItem')
const SideItem = require('../models/sideItem')

const menuRouter = require('express').Router()

menuRouter.get('/', async (request, response) => {
    const menu = await MenuSection.find({}).populate({
        path: 'items',
        populate: { path: 'sideItems' }
    })
    response.json(menu)
})

menuRouter.post('/section', async (request, response) => {
    const user = request.user
})