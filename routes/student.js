const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post('/', studentController.create); // POST /student
router.get('/', studentController.getStudent); // POST /students
router.get('/:id', studentController.getMentorById); // POST /student



 /*  router.get("/", async (req, res) => {
  console.log("get all Students");
  try {
    const data = await student.find();
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", async (req, res) => {
  console.log("Student create route");
  try {
    const data = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e.message, "error");
    res.status(500).send("Error in student POST");
  }
});
*/
module.exports = router;