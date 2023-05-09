require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URI 
    : process.env.MONGODB_URI

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL
const BUSINESS_EMAIL_PASSWORD = process.env.BUSINESS_EMAIL_PASSWORD

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

module.exports = {
    PORT, 
    MONGODB_URI, 
    EMAIL_SERVICE, 
    BUSINESS_EMAIL, 
    BUSINESS_EMAIL_PASSWORD,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN
}