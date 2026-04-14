import express from "express";

// Importing Routes
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

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

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});