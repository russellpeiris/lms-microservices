import Learner from "../schema/learnerSchema.js";
import axios from "axios";

//Get Course list from the course Microservice
const COURSE_MICRO_SERVICE_BASE_URL = "http://localhost:4003";

const getCourses = async (req, res) => {
  try {
    // Make a GET request to the course microservice to fetch the list of courses
    const response = await axios.get(COURSE_MICRO_SERVICE_BASE_URL);

    // Extract the courses from the response data
    const courses = response.data.courses;

    // Return the courses as a JSON response
    return res.status(200).json({ courses });
  } catch (error) {
    // If an error occurs, log the error and return an error response
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const addLearner = async (req, res) => {
  try {
    //checking if the currently logged in user is a learner, if so add that user as a learner
    const user_role = req.user.role;

    if (user_role == "learner") {
      let learnerData = {
        userName: "",
        email: "",
        enrolledCourses: [],
        progress: [],
      };
    } else {
      res.status(403);
      throw new Error("User is not a learner");
    }
  } catch (e) {}
};

export { getCourses };
