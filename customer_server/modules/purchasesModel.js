import mongoose from 'mongoose';
const PurchaseSchema = new mongoose.Schema({
    name: String, 
    price: Number,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
  },
  {
    bufferCommands: true,
    autoCreate: false,
    autoIndex: false,
  }
  );
const Purchase = mongoose.model('Purchase', PurchaseSchema);
export default Purchase

