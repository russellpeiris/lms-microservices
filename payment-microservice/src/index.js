import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "../configs/DBConnect.js";
import paymentRouter from "./routes/payment.js";

config();

export const paymentService = express();

paymentService.use(cookieParser());
paymentService.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

paymentService.use(express.json());

const port = process.env.PAYMENT_PORT;

paymentService.use("/", paymentRouter)

// Start the server after connecting to the database
connectDB()
  .then(() => {
    paymentService.listen(port, () => {
      console.log(`Payment server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

paymentService.get("/", (req, res) => {
  console.log(`Received request to payment server from gateway`);
  res.status(200).send("Response from payment server");
});
