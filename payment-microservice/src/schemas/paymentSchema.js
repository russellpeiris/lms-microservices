import mongoose from "mongoose";

const Schema = mongoose.Schema;

//defining the schema for the learner
const paymentSchema = new Schema(
  {
    // learnerId: {
    //   type: String,
    //   required: true,
    // },
    // learnerEmail: {
    //   type: String,
    //   required: true,
    // },
    // courseId: {
    //   type: String,
    //   required: true,
    // },
    courseCode: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
