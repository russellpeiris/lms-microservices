import Stripe from "stripe";
import Payment from "../schemas/paymentSchema.js";
import axios from "axios";

//Course route from the course Microservice
const COURSE_MICRO_SERVICE_BASE_URL = "http://localhost:4003";

//User route from the learner Microservice
const LEARNER_MICRO_SERVICE_BASE_URL = "http://localhost:4002";

export const getCheckoutSession = async (req, res) => {
  try {
    //get the currently enrolling learner
    const learnerId = req.headers.userid;

    //get the currently enrolling learner
    const learner = await axios.get(`${LEARNER_MICRO_SERVICE_BASE_URL}/user/`);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { product } = req.body;

    //create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:5173/checkout-success`,
      cancel_url: `http://localhost:5173/home`,
      learner_email: learner.email,
      learner_reference_id: req.params.courseId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: "5000",
            product_data: {
              course_code: product.courseCode,
              courseName: product.name,
            },
          },
          quantity: 1,
        },
      ],
    });

    //create new payment
    const payment = new Payment({
      learnerId: learnerId,
      learnerEmail: learner.email,
      courseId: product._id,
      courseCode: product.courseCode,
      payment: "5000",
      session: session.id,
    });

    await payment.save();

    res
      .status(200)
      .json({ success: true, message: "Payment Successfully paid", session });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating checkout session.",
    });
  }
};
