const mongoose = require("mongoose");
const {User} = require("../models");
const {StudyGuide} = require("../models")
const { insertMany } = require("../models/users");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Math_Solver");

const userSeedData = [{
    username: "Catsss",
    password: "dogsarecooltoo", 
    studyGuides: [{
        name: "Algebra II",
        problems: ["2x + 3 = 4x", "3x - 4 = 12"]
    }]
}];

const studyguideSeedData = [{
    name: "Algebra II",
    problems: ["2x + 3 = 4x", "3x - 4 = 12"]
}]

User.deleteMany({}).then(() => {
    User.collection.insertMany(userSeedData).then((data) => {
        console.log(data.result.n + "documents inserted")
        process.exit();
    })
}).catch ((error) => {
    console.log("error has occurred", error);
    process.exit();
});

StudyGuide.deleteMany({}).then(() => {
    StudyGuide.collection.insertMany(studyguideSeedData).then((data) => {
        console.log(data.result.n + "documents inserted")
        process.exit();
    })
}).catch ((error) => {
    console.log("error has occurred", error);
    process.exit();
});
