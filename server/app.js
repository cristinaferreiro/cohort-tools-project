const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PORT = 5005;

// import database
require('./db/database-connection')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Students = require('./models/Student.model')
const Cohorts = require('./models/Cohort.model');
const Cohort = require("./models/Cohort.model");



// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//------ STUDENTS ROUTES -----------



app.post('/api/students', (req, res) => {

  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Students
    .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(newStudent => res.sendStatus(201))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.get('/api/students', (req, res) => {

  Students
    .find()
    .populate('cohort')
    .then(allStudents => res.json(allStudents))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})


// Retrieves all of the students for a given cohort
app.get('/api/students/cohort/:cohortId', (req, res) => {

  const { cohortId } = req.params

  Students
    .find({ cohort: cohortId })
    .populate('cohort')
    .then(allStudents => res.json(allStudents))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.get('/api/students/:studentId', (req, res) => {


  const { studentId } = req.params

  Students
    .findById(studentId)
    .then(student => res.json(student))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.put('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects } = req.body

  Students
    .findByIdAndUpdate(studentId, { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects })
    .then(updatedStudent => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})



app.delete('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params

  Students
    .findByIdAndDelete(studentId)
    .then(() => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})



//------ STUDENTS ROUTES -----------

app.post('/api/cohorts', (req, res) => {

  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

  Cohorts
    .create({ cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours })
    .then(newCohort => res.sendStatus(201))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.get('/api/cohorts', (req, res) => {

  Cohorts
    .find()
    .then(allCohorts => res.json(allCohorts))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})


app.get('/api/cohorts/:cohortId', (req, res) => {


  const { cohortId } = req.params

  Cohorts
    .findById(cohortId)
    .then(cohort => res.json(cohort))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})




app.put('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params
  const { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours } = req.body

  Cohort
    .findByIdAndUpdate(cohortId, { cohortSlug, cohortName, program, format, campus, startDate, endDate, inProgress, programManager, leadTeacher, totalHours })
    .then(updatedCohort => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})



app.delete('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params

  Cohort
    .findByIdAndDelete(cohortId)
    .then(() => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})




// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// app.get('/api/cohorts', (req, res) => {

//   res.json(cohorts)
// })

// app.get('/api/students', (req, res) => {

//   res.json(students)
// })



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});