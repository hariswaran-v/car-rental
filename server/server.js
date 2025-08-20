import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

// Handle favicon request to avoid 500
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Local test
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on PORT ${PORT}`);
  });
}

export default async function handler(req, res) {
  try {
    await connectDB(); // cached in db.js
    return app(req, res); // pass request to express app
  } catch (err) {
    console.error("Serverless function crash:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
