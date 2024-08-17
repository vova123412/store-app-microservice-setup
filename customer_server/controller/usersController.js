import User from "../modules/usersModel.js"
const getAllUsers = async () => {
    try{
        const Users = await User.find()
        return Users
        }
        catch(error){
          console.log(error)
          throw error
        }
  };
  const CreateUser = async (req,res) => {
    try{
        console.log(req.body)
        const newUsers = await User.create(
        {
            password: req.body.password,
            username: req.body.username,
        })
        const result =  await newUsers.save()
        res.send(result)
        }
        
        catch(error){
          console.log(error)
          throw error
        }
  };
export { getAllUsers,CreateUser }