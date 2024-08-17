import express from 'express'
import  {getAllProducts,CreateProduct}  from "../controller/productsController.js"
const router = express.Router()
import {uservalidator} from "../middleware/validator.js"
import basicAuth  from '../middleware/basicauth.js'
import {purchasesProduct} from '../controller/purchasesController.js'
router.post('/createProduct',async function (req, res){ 
  try{
    const Product = await CreateProduct(req,res)
    res.send(Product)
  }
  catch(error){
    // console.log(error)
    res.send(error)
  }

 })


 router.post('/purchasesProduct',async function (req, res){ 
    try{
      const purchases = await purchasesProduct(req,res)
      res.send(purchases)
    }
    catch(error){
      // console.log(error)
      res.send(error)
    }
  
   })

 router.get('/getProducts',basicAuth,async function (req, res){ 
    try{
    const Products = await getAllProducts()
    res.send(Products)
    }
    catch(error){
    //   console.log(error)
      res.send(error)
    }
   })
 export default router