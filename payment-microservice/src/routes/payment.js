import express from "express";
import { getCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout-session/courseId", getCheckoutSession);

export default router;
