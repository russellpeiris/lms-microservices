import Stripe from "stripe";
import Payment from "../schemas/paymentSchema.js";

//Course route from the course Microservice
const COURSE_MICRO_SERVICE_BASE_URL = "http://localhost:4003";

//User route from the learner Microservice
const LEARNER_MICRO_SERVICE_BASE_URL = "http://localhost:4002";

export const getCheckoutSession = async (req, res) => {
  try {
    //get the currently enrolling learner
    // const learnerId = req.headers.userid

    // const learner = await axios.get(
    //     `${LEARNER_MICRO_SERVICE_BASE_URL}/user/${userId}`
    //   );

    //get the currently enrolling learner
    const learner = await axios.get(`${LEARNER_MICRO_SERVICE_BASE_URL}/user/`);

    //get currently enrolling course
    const courseId = req.params.courseId;
    const course = await axios.get(
      `${COURSE_MICRO_SERVICE_BASE_URL}/${courseId}`
    );

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    //create stripe checkout session
    const session = await stripe.chechout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/home`,
      learner_email: learner.email,
      learner_reference_id: req.params.courseId,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: course.price,
            product_data: {
              course_code: course.courseCode,
              courseName: course.name,
            },
          },
          quantity: 1,
        },
      ],
    });

    //create new payment
    const payment = new Payment({
      learnerId: learner._id,
      learnerEmail: learner.email,
      courseId: course._id,
      courseCode: course.courseCode,
      payment: course.price,
      session: session.id,
    });

    await payment.save();

    res
      .status(200)
      .json({ success: true, message: "Payment Successfully paid", session });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
