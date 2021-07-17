const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const router = require('express').Router();

const withAuth = require('../utils/auth.js')

const db = require("../models")

//create user login route 

//signup
router.post("/", async (req, res) => {
  try {
    const data = await User.create(req.body)
    res.json(data);

  } catch (err) {
    res.status(500).json(err)
  }
});

//login
router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne( { username: req.body.username } );
      if (!userData) {
          res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
          return;
      }

      userData.comparePassword(req.body.password, (error, validPassword) => {
        if (!validPassword) {
          res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;

          res.json({ user: userData, message: 'You are now logged in!' });
      });
      });

  } catch (err) {
      console.log(err)
      res.status(400).json(err);
  }
});
router.get('/currentUser', withAuth, async (req,res) => {
  try {
    const userData = await User.findById(req.session.user_id).populate("studyGuides")
      res.json({ user: userData });
  } 
  catch (err) {
    console.log(err)
    res.status(400).json(err);
}
});

// /api/users/:id/studyguides/??

// /api/me/studyguides  (optional) -> [{}, {}, {}]

// /api/studyguides/:id/problems/:id/answer -> find the study guide then find the problem hit wolfram

module.exports = router;