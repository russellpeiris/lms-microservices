import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lectureContentSchema = new Schema({
  lectureNumber: {
    type: Number,
    required: true,
  },
  lecturePdfUrl: {
    type: String,
    default: "No pdf uploaded",
  },
  lectureVideoUrl: {
    type: String,
    default: "No video uploaded",
  },
  lectureQuizUrl: {
    type: String,
    default: "No quiz yet",
  },
});

const courseSchema = new Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lectureContent: [lectureContentSchema],
    approval: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
