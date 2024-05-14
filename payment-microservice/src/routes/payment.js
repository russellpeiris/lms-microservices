import express from "express";
import { getCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout-session", getCheckoutSession);

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27", // specify the API version you are using
});

// Route to create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { courseId } = req.body;

    // Retrieve course details based on courseId (you may need to implement this)
    const course = await Course.findById(courseId);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
              // Other product details if needed
            },
            unit_amount: course.price * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/checkout-success", // Redirect URL after successful payment
      cancel_url: "http://localhost:5173/home", // Redirect URL if payment is canceled
    });

    // Return the session ID and checkout URL to the frontend
    res.json({
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
