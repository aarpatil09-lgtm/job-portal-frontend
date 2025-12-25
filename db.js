import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
    // Log when connected
    mongoose.connection.on('connected', () => console.log('Database connected'));

    // Optional: log connection errors
    mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/jobportalUser`);
};

export default connectDB;
