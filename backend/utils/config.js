require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URI 
    : process.env.MONGODB_URI

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL
const BUSINESS_EMAIL_PASSWORD = process.env.BUSINESS_EMAIL_PASSWORD

module.exports = { PORT, MONGODB_URI, EMAIL_SERVICE, BUSINESS_EMAIL, BUSINESS_EMAIL_PASSWORD }