import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    password: { type: String },
    username: { type: String, required: true, unique: true, dropDups: true, index: true }
  },
  {
    bufferCommands: true,
    autoCreate: false,
    autoIndex: false,
  }
  );
const User = mongoose.model('User', UserSchema);
export default User
