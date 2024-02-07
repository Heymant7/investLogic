const express = require('express')
const connectDb = require('./db')
const cors = require('cors')
const router = require('./routes')

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000

connectDb;

app.use('/user', router)

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
})

connectDb.connect((err)=>{
    if(err) throw err
    console.log('mysql db connected');
})