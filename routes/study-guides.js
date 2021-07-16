const express = require("express");
const mongoose = require("mongoose");
const StudyGuide = require("../models/users");
const router = require('express').Router();

const db = require("../models")

//router.put--> this one will be findOneandUpdate
//create a route to delete a whole study guide 

router.get("/", (req, res) => {
    db.StudyGuide.find({})
      .then(dbStudyguide => {
        res.json(dbStudyguide);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.post("/:UserId", ({ body,params }, res) => {
    db.StudyGuide.create(body)
      .then(({ _id }) => db.User.findOneAndUpdate({ _id: params.UserId }, 
      { $push: { studyGuides: _id } }, 
      { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //populate only the guides for one user
  router.get("/:userID", (req, res) => {
    db.User.findOne({_id: req.params.userID})
      .populate("studyGuides")
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;