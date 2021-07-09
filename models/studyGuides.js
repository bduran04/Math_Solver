const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudyGuidesSchema = new Schema({
        name: {type: String},
        problems: [{type: String}]
});

const StudyGuide = mongoose.model("StudyGuide", StudyGuidesSchema);

module.exports = StudyGuide;