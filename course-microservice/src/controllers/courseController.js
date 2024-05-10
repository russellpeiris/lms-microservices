import Course from "../schemas/courseSchema.js";

//Get course List
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    console.error("Faced an error retrieving courses:", error);
    return res.status(500).json({
      error: "Failed to retrieve courses",
    });
  }
};

//Get Course Details
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        error: "No course found",
      });
    }

    return res.status(200).json({
      message: "Course retrieved successfully",
      course,
    });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return res.status(500).json({
      error: "Failed to retrieve course",
    });
  }
};

//Create a new Course
const createCourse = async (req, res) => {
  try {
    const { courseCode, name, lectureContent } = req.body;

    if (!courseCode || !name) {
      return res.status(400).json({
        error: "Course code and name are required.",
      });
    }

    const newCourse = new Course({
      courseCode,
      name,
      lectureContent: lectureContent || [],
    });

    await newCourse.save();

    return res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      error: "Failed to create course.",
    });
  }
};

//Update a course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ error: "Failed to update course" });
  }
};

//Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: "Failed to delete course" });
  }
};

//Approve course
const approveCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { approval } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { approval },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json({
      message: approval === "true" ? "Course approved" : "Course declined",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error approving course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//method to get course by course code (to display once enrolled by learner)
const getCourseByCourseCode = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const course = await Course.findOne({ courseCode: courseCode });

    if (!course) {
      res.status(404).json({ message: " Course not found" });
      return;
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error getting course by Course code");
    return res
      .status(500)
      .json({ error: "Error getting course by course code" });
  }
};

export {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourse,
  approveCourse,
  getCourseByCourseCode,
};
