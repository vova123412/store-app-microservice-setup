import Product from "../modules/productModel.js"
const getAllProducts = async () => {
    try{
        const allProducts = await Product.find()
        return allProducts
        }
        catch(error){
          console.log(error)
          throw error
        }
  };
  const CreateProduct = async (req,res) => {
    try{
        const newProduct = await Product.create(
        {    
            name: req.body.name,
            price: req.body.price,
        })
        const result =  await newProduct.save()
        return result
        res.send(result)
        }
        catch(error){
          throw error
        }
  };
export { CreateProduct,getAllProducts }