import mongoose from "mongoose";

const mongoDBConnection = async (): Promise<void> => {
  try {
    // Ensure the connection string is available
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connection established successfully");
  } catch (error) {
    if (error instanceof Error) {
      // Narrowing the error type to Error
      console.error("MongoDB connection error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export default mongoDBConnection;
