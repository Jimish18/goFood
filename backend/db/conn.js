const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
// 'mongodb+srv://jimish1806:Jimish%401806@cluster0.ty56o4y.mongodb.net/gofoodmern?retryWrites=true&w=majority'

mongoose.connect(url)
.then(()=>
{
    console.log("database Connection Etablished");
})
.catch((e) =>
{
    console.log(e);
})


