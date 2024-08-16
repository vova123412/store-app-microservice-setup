import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    lastname: String
  },
  {
    bufferCommands: true,
    autoCreate: false,
    autoIndex: false,
  }
  );
const User = mongoose.model('User', UserSchema);
export default User
