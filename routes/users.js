const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const router = require('express').Router();

const db = require("../models")

router.get("/", (req, res) => {

    db.User.find({})
      .sort({ date: -1 })
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
          console.log(err)
        res.status(400).json(err);
      });
  });

  router.post("/", async (req, res) => {
    try {
        const data = await User.create(req.body)
        res.json(data);

    } catch (err) {
        res.status(500).json(err)
    }
});

  //This needs work; determine if getting via :id is okay 
  router.get("/:id", async (req, res) =>  {
    try {
      const id = req.params.id;
      const data = await User.findOne(
          { _id: id },
      );
      res.json(data);
  } catch (err) {
      res.status(500).json(err)
  }
});

  module.exports = router;