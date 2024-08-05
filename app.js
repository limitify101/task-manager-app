require('dotenv').config()
const express = require('express')
const app = express()
const tasks = require('./routes/Tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorhandler')
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks);

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{console.log(`Server listening on port ${port}...`)})
    } catch (error) {
        console.log(error)
    }
}
start()