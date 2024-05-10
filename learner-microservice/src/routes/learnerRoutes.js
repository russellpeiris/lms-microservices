import express from "express";
import {
  addLearner,
  getCourses,
  getCurrentLearner,
} from "../controllers/learnerController.js";

//creating a router
const router = express.Router();

router.get("/courses", getCourses);
router.get("/user", getCurrentLearner);
router.post("/", addLearner);

export { router };
