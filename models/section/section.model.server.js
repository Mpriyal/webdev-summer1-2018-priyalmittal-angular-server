var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function deleteSection(sectionId) {
    return sectionModel.remove({_id: sectionId})
}

function findSectionById(sectionId) {
    return sectionModel.findById(sectionId);
}

function updateSection(section) {
    let u = sectionModel.updateOne({_id: section._id}, section);
    return u;
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

module.exports = {
    createSection: createSection,
    deleteSection: deleteSection,
    updateSection: updateSection,
    findSectionById: findSectionById,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats
};