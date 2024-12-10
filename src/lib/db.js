import mongoose  from "mongoose";

export const dbConnection = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('connection istablished with success!',conn.connection.host)
} catch (error) {
    console.log('error happend',error)
}
}