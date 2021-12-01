import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    const mongoConection = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${mongoConection.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB Connection Error : ${error.message}`);
    process.exit(1);
  }
};
