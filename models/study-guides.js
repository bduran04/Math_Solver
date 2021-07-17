const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudyGuidesSchema = new Schema({
        name: {type: String},
        problems: [String]
});

// /api/studyguides/studyguideId

// /api/studyguides/:id/problems/:id/answer -> find the study guide then find the problem hit wolfram

const StudyGuide = mongoose.model("StudyGuide", StudyGuidesSchema);

module.exports = StudyGuide;