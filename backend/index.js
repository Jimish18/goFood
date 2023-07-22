const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname , '../frontend/build')));

app.use((req,res,next) =>
{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use('/', require('./routes/Routes'));

app.use('*',function(req,res) 
{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
})

app.listen(port , ()=>
{
    console.log(`Server Listening to port Number ${port}`);
})
