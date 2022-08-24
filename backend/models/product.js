
const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    taskname:{
        type:String
    }
    

})

module.exports=mongoose.model("Task",productSchema)
