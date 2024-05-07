import express from "express";
// Importing named exports from the course controller
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourse,
  approveCourse,
} from "../controllers/courseController.js";

//create a router
const router = express.Router();

//get all courses
router.get("/", getCourses);

//get a course by courseNo
router.get("/:id", getCourse);

//post a new Course
router.post("/", createCourse);

//Update a course
router.patch("/:id", updateCourse);

//Delete a course
router.delete("/:id", deleteCourse);

//Approve a course
router.patch("/approve/:id", approveCourse);

//export the router
export { router };
