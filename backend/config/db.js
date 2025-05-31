import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/tomato`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
