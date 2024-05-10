import express from "express";
import { getCourses } from "../controllers/learnerController.js";

//creating a router
const router = express.Router();

router.get("/courses", getCourses);

export { router };
