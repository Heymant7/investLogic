const express = require('express')
const connectDb = require('./db')
const cors = require('cors')
const router = require('./routes')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  optionsSuccessStatus: 200,
  credentials: true
}));


const PORT = 8000

connectDb;



app.use('/user', router)

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
})

connectDb.connect((err)=>{
    if(err) throw err
    console.log('mysql db connected');
})

// const express = require('express');
// const connectDb = require('./db');
// const cors = require('cors');
// const router = require('./routes');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken'); 

// const app = express();
// const PORT = 5001;

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
//   credentials: true
// }));

// connectDb; 

// app.use('/user', router);

// app.listen(PORT, () => {
//     console.log(`Server is running at ${PORT}`);
// });

// connectDb.connect((err)=>{
//       if(err) throw err
//       console.log('mysql db connected');
// })
  