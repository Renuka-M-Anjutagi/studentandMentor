const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

router.post('/', mentorController.create); // POST /mentor
router.get('/', mentorController.getMentor); // POST /mentor
router.get('/:id', mentorController.getStudentById); // POST /mentor
router.get('/:id', mentorController.getMentorStudents); // POST /mentor
router.get('/previous/:id', mentorController.getPreviousMentor); // POST /mentor
router.get('/:id/:id', mentorController.assignStudentToMentor); // POST /mentor
router.get('/', mentorController.getNoMentorStudents); // POST /mentor

/*router.get("/", async (req, res) => {
  console.log("get all mentors");
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send(e);
  }
});

router.post("/", async (req, res) => {
  console.log("mentor create route");
  try {
    const data = await mentor.create({
      name: req.body.name,
      email: req.body.email,
      expertise: req.body.expertise,
      studentsAssigned: req.body.studentsAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send("Error");
  }
});

router.get("/:id", async (req, res) => {
  console.log("show all students for particular mentor");
  try {
    const ment = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(ment);
  } catch (e) {
    console.log(e, "error");
    res.status(500).send("error in for 1 mentor get all students");
  }
});
*/
module.exports = router;