// imports
require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

// middleware

// allow for 'res.json'
app.use(express.json())

// allows you to pass arguments in the url
app.use(express.urlencoded({extended: true}));

// // mounting components
app.use('/weather', require('./weather'))

// app running
app.listen(process.env.PORT,  () => {
    console.log('Server running and listening to: ', process.env.PORT)
})