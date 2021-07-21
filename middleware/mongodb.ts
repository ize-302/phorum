import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDatabase;
