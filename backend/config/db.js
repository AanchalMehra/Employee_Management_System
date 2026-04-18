import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB successfully connected");
    } catch (err) {
        console.log(err);
    }
};

export default dbConnection;