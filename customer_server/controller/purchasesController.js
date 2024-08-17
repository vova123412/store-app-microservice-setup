import Purchase from "../modules/purchasesModel.js"
import Product from "../modules/productModel.js"
import { produceMessage } from "../services/kafka/producer.js";

const getAllPurcheses = async () => {
  try{
      const allProducts = await Purchase.find()
      return allProducts
      }
      catch(error){
        console.log(error)
        // throw error
      }
};

const getProduct = async (name,price) => {
    try{
        const specificProduct = await Product.findOne({ name, price })
        return specificProduct
        }
        catch(error){
          console.log(error)
          // throw error
        }
  };
  const produceMesage = async (req,res) => 
  {
    try{
      const message = await produceMessage(req.body.topic,req.body.message)
      return message
      }
      catch(error){
        console.log(error)
        // throw error
      }
  }
  const purchasesProduct = async (purchase) => {
    try{
        console.log("consumer :" + purchase.message)
        const specificProduct = await getProduct(purchase.name,purchase.price)
        const specificUserId = purchase.userid
        console.log(specificProduct)
        if(!specificProduct)
        {
            return {"message":"no prodcut found"}
        }
        const newPurchase = await Purchase.create(
        {    
            name: specificProduct.name,
            price: specificProduct.price,
            userid: specificUserId
        })
        const result =  await newPurchase.save()
        return result
     
        }
        catch(error){
          console.log(error)
          // throw error
        }
  };
export { purchasesProduct,produceMesage,getAllPurcheses }