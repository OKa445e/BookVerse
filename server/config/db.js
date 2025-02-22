// Sk.atharv@321-password and atharvsinha-user
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const URI = process.env.URI;

export const connectDB = () => {
  mongoose.connect(URI,{
    dbName: "libraryDatabase"
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));
};

