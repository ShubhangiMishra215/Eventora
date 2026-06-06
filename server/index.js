const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const bookingRoutes = require('./routes/booking')
const eventRoutes = require('./routes/event')

dotenv.config();

const app =express()
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/events',eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to database")
})
.catch((error)=>{
    console.error('Error connecting to MongoDB', error)
})

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})