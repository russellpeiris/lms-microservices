import Learner from "../schema/learnerSchema.js";
import axios from "axios";

//Get Course list from the course Microservice
const COURSE_MICRO_SERVICE_BASE_URL = "http://localhost:4003";

const USER_MICRO_SERVICE_BASE_URL = "http://localhost:4001";

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
    const userId = req.headers.userid;
    const user = await axios.get(
      `${USER_MICRO_SERVICE_BASE_URL}/user/${userId}`
    );

    const learner = user.data;

    let learnerData = {
      learnerId: learner._id,
      userName: learner.name,
      email: learner.email,
      enrolledCourses: [],
      progress: [],
    };

    const newLearner = await Learner.create(learnerData);

    newLearner.save();

    return res.status(200).json({ newLearner });
  } catch (error) {
    console.error("Error adding learner:", error);
    return res.status(500).json({ error: "Failed to add learner" });
  }
};

const getCurrentLearner = async (req, res) => {
  try {
    //get the course microsrvice
    const userId = req.headers.userid;
    console.log("UserId: ", userId);
    return res.status(200).json({ userId });
  } catch (error) {
    console.error("Error getting userId");
    return res.status(500).json({ error: "Error getting userId" });
  }
};

export { getCourses, getCurrentLearner, addLearner };
