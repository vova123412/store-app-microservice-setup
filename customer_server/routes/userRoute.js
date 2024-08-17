import express from 'express'
import  {getAllUsers,CreateUser}  from "../controller/usersController.js"
const router = express.Router()
import {uservalidator} from "../middleware/validator.js"
import basicAuth  from '../middleware/basicauth.js'
router.post('/createUser',uservalidator,async function (req, res){ 
  try{
    const user = await CreateUser(req,res)
    res.send(user)
  }
  catch(error){
    // console.log(error)
    res.send(error)
  }

 })


 router.get('/getUsers',basicAuth,async function (req, res){ 
    try{
    const Users = await getAllUsers()
    res.send(Users)
    }
    catch(error){
    //   console.log(error)
      res.send(error)
    }
   })
 export default router