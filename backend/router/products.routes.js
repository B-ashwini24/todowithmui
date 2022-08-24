const express=require("express")

const prodrouter=express.Router()
const {saveproddata,getproducts,deletedata,editdata}=require("../controllers/products.controller")

const {prodmiddleware}=require("../middlewares/products.middleware")
prodrouter.post("/",prodmiddleware,saveproddata)
prodrouter.get("/getproducts",getproducts)
prodrouter.delete("/delete/:id",deletedata)
prodrouter.put("/edit",editdata)

module.exports= prodrouter


