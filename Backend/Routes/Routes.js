const express = require("express");
const { postStudentData, getAllStudents, studentDataId, getstudentSearch, editstudent, deletestudent } = require("../Controllers/studentDataControllers")
const router = express.Router();

router.post("/api/student", postStudentData)

router.get("/students/all", getAllStudents)

router.get("/studentDataId", studentDataId)

router.get("/student/search", getstudentSearch)

router.post("/student/edit/:id", editstudent)

router.delete("/student/delete/:id", deletestudent)

module.exports = router