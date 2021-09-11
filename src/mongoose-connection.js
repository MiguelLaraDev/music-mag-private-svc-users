import mongoose from "mongoose";

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  console.log("Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("Connection Closed");
});

mongoose.connection.on("error", (error) => {
  console.log("ERROR: " + error);
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {});
};

export default connectDB;
