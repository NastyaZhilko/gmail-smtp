const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3010

app.use(cors({
    origin: ['http://localhost:3000']
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: smtp_login, // generated ethereal user
            pass: smtp_password, // generated ethereal password
        },
    });

    let {name, email, message } = req.body;
    // send mail with defined transport object

    let info = await transporter.sendMail({
        from: 'HR', // sender address
        to: "nasten4ik2010@gmail.com", // list of receivers
        subject: 'HR WANTS ME', // Subject Line

        html: `<b>Message to my portfolio page</b>
    <div>
        name: ${name}
    </div>
    <div>
        email: ${email}
    </div>
    <div>
       ${message}
    </div>`
    });
    res.send('Ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})