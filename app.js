require('dotenv').config()
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')

//middleware

app.use(express.json())
app.use('/api/v1/tasks' , tasks)



// app.get('/home' ,(req , res) => {
//     res.send('Task Manager Home')
// })
 

const port = 3000

const start = async() => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`Server is listening on ${port}...`))
    } catch (error) {
        console.log(error);
        
    }
}

start()









