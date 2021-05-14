const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./routes/auth')
const mongoose = require('mongoose')
const postRoute = require('./routes/posts')

dotenv.config();
app.use(cors())
app.use(express.json())


app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:true, useNewUrlParser:true}  )
.then(()=>console.log('conneceted to DB'))
.catch((err)=>console.log(err))

app.listen(5000, ()=>console.log('Server running'));