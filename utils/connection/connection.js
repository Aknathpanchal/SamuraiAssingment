import mongoose from "mongoose";

export const dbConnect = async () => {
  const db_Uri = process.env.MONGODB_URI;
  try {
    mongoose.connect(db_Uri);
    console.log("Connected to Database");
  } catch (error) {
    console.log(
      "Something went wrong while connecting to database  error:",
      error
    );
  }
};