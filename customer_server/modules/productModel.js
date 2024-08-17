import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true },
  },
  {
    bufferCommands: true,
    autoCreate: false,
    autoIndex: false,
  }
  );
const Product = mongoose.model('Product', ProductSchema);
export default Product
