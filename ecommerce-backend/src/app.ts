import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";


// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
const port = 4000;

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Api Working");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));


app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});