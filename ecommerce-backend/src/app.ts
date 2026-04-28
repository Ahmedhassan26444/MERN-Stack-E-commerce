import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import NodeCache from "node-cache";
import{ config } from "dotenv";
import morgan from "morgan";
// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";


const port = process.env.PORT || 4000;

config({
  path:"./.env",

})

// Connect to MongoDB
const mongo_URI = process.env.MONGO_URI || "";

connectDB(mongo_URI);

export const mycache = new NodeCache();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Api Working");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/dashboard", dashboardRoute);

app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});