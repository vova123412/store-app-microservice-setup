import express from 'express'
import User from "../modules/usersModel.js"
import  {getAllUsers}  from "../controller/usersController.js"
const router = express.Router()
router.post('/createUser',async function (req, res){ 
  try{
  const log = await User.create({
            name: "amir", 
            lastname: "va"    
        }).then(result => res.send(result))
    
  }
  
  catch(error){
    console.log(error)
  }

 })


 router.get('/getUser',async function (req, res){ 
    try{
    const Users = await getAllUsers()
    res.send(Users)
    }
    catch(error){
      throw error
    }
   })
 export default router