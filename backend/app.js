const express = require('express');
const cors = require('cors');
const app = new express();
app.use(cors())

require('dotenv').config()
const PORT = process.env.PORT

const employeeRoutes = require('./routes/employeeRoutes')
const user_route=require('./routes/user')
app.use('/employee',employeeRoutes)
require('./db/connection');
app.use("/user",user_route)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})