
const Task=require("../models/product")
const saveproddata=(req,res)=>{
    const task=new Task({
        taskname:req.body.taskname
        
    })
    task.save().then(data=>{
        res.send({
            message:"data saved",
            data:data
        })
    })
    
}


const getproducts=(req,res)=>{
Task.find().then(result=>{
        res.send({
            
            data:result
        })
    })
}
const deletedata=(req,res)=>{
    Task.deleteOne({_id:req.params.id}).then(response=>{
res.send({
    message:"Task deleted"
})
    }).catch(err=>{
        console.log(err)
     })
}

const editdata=(req,res)=>{
    const data=req.body
    console.log(data)
    Task.updateOne({_id:data._id},{$set:{taskname:data.taskname}}).then(response=>{
        res.send({
            message:"data updated"
        })
    }).catch(err=>{
        console.log(err)
    })
}

module.exports={
    saveproddata  ,
    getproducts ,
    editdata,
    deletedata
}