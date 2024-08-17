import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
    name: String,
    price: String,
  },
  {
    bufferCommands: true,
    autoCreate: false,
    autoIndex: false,
  }
  );
const Product = mongoose.model('Product', ProductSchema);
export default User
