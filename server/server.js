const express = require('express')
const cors = require('cors')
require('dotenv').config()

const analysisRoutes = require('./routes/analysis')
const historyRoutes = require('./routes/history')
const auth = require("./middleware/auth");

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({
        status: 'Server is running'
    })
})

app.use('/api', analysisRoutes)
app.use("/api", auth, historyRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})