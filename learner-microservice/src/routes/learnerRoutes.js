import express from "express";
import {
  getCourses,
  getCurrentUser,
} from "../controllers/learnerController.js";

//creating a router
const router = express.Router();

router.get("/courses", getCourses);
router.get("/user", getCurrentUser);

export { router };
