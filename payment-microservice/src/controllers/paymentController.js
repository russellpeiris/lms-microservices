import Stripe from "stripe";
import Payment from "../schemas/paymentSchema.js";
import axios from "axios";

//Course route from the course Microservice
const COURSE_MICRO_SERVICE_BASE_URL = "http://localhost:4003";

//User route from the learner Microservice
const LEARNER_MICRO_SERVICE_BASE_URL = "http://localhost:4002";

export const checkoutPayment = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { courseId, courseCode, payment, courseName } = req.body;

  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: `Course code : ${courseCode}`,
          description: `Course Name : ${courseName}`,
        },

        unit_amount: payment,
      },
      quantity: 1,
    },
  ];

  const newPayment = new Payment({
    courseCode,
    payment,
    courseId,
  });

  await newPayment.save();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/checkout-success/${courseId}`,
      cancel_url: `http://localhost:5173/checkout-failed/${courseId}`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { courseCode, payment } = req.body;

    //const learnerId = req.headers.userid;

    // const learner = await axios.get(`${LEARNER_MICRO_SERVICE_BASE_URL}/user/`);

    // const learnerId = learner._id;

    if (!courseCode || !payment) {
      return res.status(400).json({
        error: "Course code and payment are required.",
      });
    }

    const newPayment = new Payment({
      courseCode,
      payment,
    });

    await newPayment.save();

    return res.status(201).json({
      message: "Payment created successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      error: "Failed to create payment.",
    });
  }
};

//checkout session creation
