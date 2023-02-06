const express = require("express")
var bodyParser = require('body-parser');
const router = require("./router/route")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery",true)
mongoose.connect("mongodb+srv://divyamala_:Dt25042000knp@divyamala.0cofsch.mongodb.net/group8Database",{
    useNewUrlParser:true
})

.then(()=>console.log("MongoDb is Connected"))
.catch((err=>console.log(err)))

app.use("/",router)

app.listen(process.env.Port||3000,()=>{
    console.log("Express App Running On Port",+(process.env.Port||3000))
})