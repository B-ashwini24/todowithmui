

require("dotenv").config()
const app=require("./app")
const port=process.env.PORT || 8081
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO).then(data=>{
    app.listen(port,()=>{
        console.log("server running",port)
    })
}).catch(err=>{
    console.log(err)
})

