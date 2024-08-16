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
export { getAllUsers }