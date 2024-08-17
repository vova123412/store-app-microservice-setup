import User from "../modules/usersModel.js"
const getUser = async (username,password) => {
    try{
        const specificUser = await User.findOne({ username, password })
        console.log(specificUser)
        return specificUser
        }
        catch(error){
          throw error
        }
  };
const getAllUsers = async () => {
    try{
        const Users = await User.find()
        return Users
        }
        catch(error){
          throw error
        }
  };
  const CreateUser = async (req,res) => {
    try{
        const newUsers = await User.create(
        {
            password: req.body.password,
            username: req.body.username,
        })
        const result =  await newUsers.save()
        res.send(result)
        }
        
        catch(error){
         
          throw error
        }
  };
export { getAllUsers,CreateUser,getUser }