import Purchase from "../modules/purchasesModel.js"
import {getUser}  from "../controller/usersController.js";
import Product from "../modules/productModel.js"
const getProduct = async (name,price) => {
    try{
        const specificProduct = await Product.findOne({ name, price })
        return specificProduct
        }
        catch(error){
          console.log(error)
          throw error
        }
  };
  const purchasesProduct = async (req,res) => {
    try{
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
       

        const specificProduct = await getProduct(req.body.name,req.body.price)
        // console.log(specificProduct)
        const specificUser = await getUser(username,password)
        console.log(specificUser._id)
        const newPurchase = await Purchase.create(
        {    
            name: specificProduct.name,
            price: specificProduct.price,
            userid: specificUser._id
        })
        const result =  await newPurchase.save()
        return result
     
        }
        catch(error){
          throw error
        }
  };
export { purchasesProduct }