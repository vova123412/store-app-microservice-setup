import mongoose from 'mongoose';
const PurchaseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true },
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

