import express from 'express'
import basicAuth  from '../middleware/basicauth.js'
const router = express.Router()
import {produceMesage,getAllPurcheses} from '../controller/purchasesController.js'
router.get('/getAllPurcheses',basicAuth,async function (req, res){ 
    try{
    const Products = await getAllPurcheses()
    res.send(Products)
    }
    catch(error){
    //   console.log(error)
      res.send(error)
    }
   })



   router.post('/purchaseProduct',basicAuth,async function (req, res){ 
    try{
      const purchases = await produceMesage(req,res)
      res.send(purchases)
    }
    catch(error){
      // console.log(error)
      res.send(error)
    }}
)
router.get('/getAllPurcheses',basicAuth,async function (req, res){ 
    try{
    const Products = await getAllPurcheses()
    res.send(Products)
    }
    catch(error){
    //   console.log(error)
      res.send(error)
    }
   })

export default router