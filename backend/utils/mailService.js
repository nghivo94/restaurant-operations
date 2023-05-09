const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const config = require('./config')

const generateMailTransporter = async () => {
    const oAuth2Client = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.REDIRECT_URI)
    oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN })
    const accessToken = await oAuth2Client.getAccessToken()

    const mailTransporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            type: 'OAuth2',
            user: config.BUSINESS_EMAIL,
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })
    return mailTransporter
}


const sendMailOfStaffAdded = async (accountInfo, creatorEmail, ownerEmail) => {
    const timeStamp = new Date()

    const mailTransporter = await generateMailTransporter()

    const toCreatorDetails = {
        from: config.BUSINESS_EMAIL,
        to: creatorEmail,
        subject: "Modern Bistro 77 - Addition of new staff Account",
        html: `<p> At ${timeStamp.toUTCString()}, you added a new staff acount for ${accountInfo.firstName} ${accountInfo.lastName}. 
        Registration details for the newly added staff account are: </p>
            <div>Username: ${accountInfo.username}</div>
            <div>Password: ${accountInfo.password}</div>`
    }
    await mailTransporter.sendMail(toCreatorDetails)
    if (ownerEmail) {
        const toOwnerDetails = {
            from: config.BUSINESS_EMAIL,
            to: ownerEmail,
            subject: "Modern Bistro 77 - New Staff Account",
            html: `<p> Welcome, ${accountInfo.firstName}! We have registered a new account for you to login to 
            our Restaurant Operations App. Registration details for this account are: </p>
                <div>Username: ${accountInfo.username}</div>
                <div>Password: ${accountInfo.password}</div>
            <p>Please login to the App using these details and update your contact information. Remember to also 
            create a new password for your account.</p>`
        }
        await mailTransporter.sendMail(toOwnerDetails)
    }
}

const sendMailOfStaffChanged = async (username, reportLink, staffEmail) => {
    const timeStamp = new Date()

    const mailTransporter = await generateMailTransporter()

    const details = {
        from: config.BUSINESS_EMAIL,
        to: staffEmail,
        subject: "Modern Bistro 77 - Information changed",
        html: `<p>Your information in the registered staff account with username ${username} 
        has been changed at ${timeStamp.toUTCString()}. 
        Please send a report via the link below if you have not made this change.</p>
        <a href={${reportLink}}>${reportLink}</a>`
    }
    await mailTransporter.sendMail(details)
}

const sendMailOfStaffChangedByManager = async (username, reportLink, managerEmail, staffEmail ) => {
    const timeStamp = new Date()

    const mailTransporter = await generateMailTransporter()

    const toManagerDetails = {
        from: config.BUSINESS_EMAIL,
        to: managerEmail,
        subject: "Modern Bistro 77 - Information changed",
        html: `<p>Staff's information in the registered staff account with username ${username} 
        has been changed at ${timeStamp.toUTCString()} with your account. 
        Please send a report via the link below if you have not made this change.</p>
        <a href={${reportLink}}>${reportLink}</a>`
    }

    await mailTransporter.sendMail(toManagerDetails)

    if (staffEmail) {
        const toStaffDetails = {
            from: config.BUSINESS_EMAIL,
            to: staffEmail,
            subject: "Modern Bistro 77 - Information changed",
            html: `<p>Your information in the registered staff account with username ${username} 
            has been changed at ${timeStamp.toUTCString()} by your manager. 
            Please send a report via the link below if you are not aware of this change.</p>
            <a href={${reportLink}}>${reportLink}</a>`
        }

        await mailTransporter.sendMail(toStaffDetails)
    }
}

const sendMailOfStaffRemoved = async (username, reportLink, managerEmail, staffEmail) => {
    const timeStamp = new Date()

    const mailTransporter = await generateMailTransporter()

    const toManagerDetails = {
        from: config.BUSINESS_EMAIL,
        to: managerEmail,
        subject: "Modern Bistro 77 - Information changed",
        html: `<p>The registered staff account with username ${username} 
        has been removed at ${timeStamp.toUTCString()} with your account. 
        Please send a report via the link below if you have not made this change.</p>
        <a href={${reportLink}}>${reportLink}</a>`
    }

    await mailTransporter.sendMail(toManagerDetails)

    if (staffEmail) {
        const toStaffDetails = {
            from: config.BUSINESS_EMAIL,
            to: staffEmail,
            subject: "Modern Bistro 77 - Information changed",
            html: `<p>Your registered staff account with username ${username} 
            has been removed at ${timeStamp.toUTCString()} by your manager. 
            Please send a report via the link below if you are not aware of this change.</p>
            <a href={${reportLink}}>${reportLink}</a>`
        }

        await mailTransporter.sendMail(toStaffDetails)
    }
}

module.exports = { 
    sendMailOfStaffAdded, 
    sendMailOfStaffChanged, 
    sendMailOfStaffChangedByManager, 
    sendMailOfStaffRemoved 
}