module.exports = function (app) {

  app.post('/api/course/:courseId/section', createSection);
  app.delete('/api/section/:sectionId', deleteSection);
  app.put('/api/section/:sectionId', updateSection);
  app.get('/api/section/:sectionId', findSectionById);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  app.post('/api/section/:sectionId/unenrollment', unEnrollStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    enrollmentModel
      .findSectionsForStudent(studentId)
      .then(function(enrollments) {
        res.json(enrollments);
      });
  }

  function updateSection(req, res) {
      var section = req.body;
      sectionModel
          .updateSection(section)
          .then(function (section) {
              res.json(section);
          })
  }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };
    sectionModel
      .decrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .enrollStudentInSection(enrollment)
      })
      .then(function (enrollment) {
        res.json(enrollment);
      })
  }

    function unEnrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .unEnrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }

    function findSectionById(req, res) {
        var id = req.params['sectionId'];
        sectionModel.findSectionById(id)
            .then(function (section) {
                res.json(section);
            })
    }

  function deleteSection(req, res) {
    var sectionId = req.params['sectionId'];
    sectionModel.deleteSection(sectionId)
        .then(function (sections) {
          res.json(sections);
        })
  }
};