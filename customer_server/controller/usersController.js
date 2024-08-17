import User from "../modules/usersModel.js"
const getUser = async (req,res) => {
    try{
        const { username, password } = req.body;
        const specificUser = await User.findOne({ username })
        return specificUser
        }
        catch(error){
          // throw error
        }
  };
const getAllUsers = async () => {
    try{
        const Users = await User.find()
        return Users
        }
        catch(error){
          // throw error
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
        return result
        // res.send(result)
        }
        
        catch(error){
         
          // throw error
        }
  };
export { getAllUsers,CreateUser,getUser }