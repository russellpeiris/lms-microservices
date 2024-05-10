import express from "express";
import {
  addLearner,
  getCourses,
  getCurrentLearner,
  learnerEnroltoCourses,
  learnerUnenrolFromCourse,
} from "../controllers/learnerController.js";

//creating a router
const router = express.Router();

router.get("/courses", getCourses);
router.get("/user", getCurrentLearner);
router.post("/", addLearner);
router.patch("/enrol", learnerEnroltoCourses);
router.patch("/unenrol/:courseCode", learnerUnenrolFromCourse);

export { router };
