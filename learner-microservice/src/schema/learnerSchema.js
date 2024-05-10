import mongoose from "mongoose";

const Schema = mongoose.Schema;

//defining the learner progress schema
const learnerProgressSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLectures: [
    {
      type: Number,
    },
  ],
  quizScores: [
    {
      quizNumber: {
        type: Number,
      },
      score: {
        type: Number,
      },
    },
  ],
  overallCompletion: {
    type: Number,
    default: 0,
  },
});

//defining the schema for the learner
const learnerSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  progress: [learnerProgressSchema],
});

const Learner = mongoose.model("Learner", learnerSchema);

export default Learner;
