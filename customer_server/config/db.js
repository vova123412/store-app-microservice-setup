
import mongoose from 'mongoose';
const connectToMongoDB = async (username,password) => {
    return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE_URL , { 
        maxPoolSize: 10,
        minPoolSize: 1,
        authSource: "admin", // database to use for authentication 
        //  serverSelectionTimeoutMS: 5000,
        user: username,
        pass: password,
        auth: { authSource: "admin" }
        })
      .then(() => {
        console.log('Connected to MongoDB');
        resolve();
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        reject(error);
      });
    });
  };

export default  connectToMongoDB

