const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const router = require('express').Router();
const https = require('https');
//this is gonna also go into the environment variables 

const withAuth = require('../utils/auth.js')

const db = require("../models")

//create user login route 

//signup
router.post("/", async (req, res) => {
  try {
    const data = await User.create(req.body)
    res.json({data, status: 200});

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
              .status(401)
              .json({ message: 'Incorrect email or password, please try again' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.json({ user: userData, message: 'You are now logged in!', status: 200});
      });
      });

  } catch (err) {
      console.log(err)
      res.status(400).json(err);
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

//this obtains info from the logged in user 
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

//wolfram alpha data
router.post('/wolfram', async (req, res) => {
  try {

    // const answer = await waApi.getFull({
    //   input: req.body.equation
    // })
    res.send({"success": 200, answer: require('./fakeData.json')});
  } catch (e) {
    console.log(e);
  }

})


// /api/users/:id/studyguides/??

// /api/me/studyguides  (optional) -> [{}, {}, {}]

// /api/studyguides/:id/problems/:id/answer -> find the study guide then find the problem hit wolfram

module.exports = router;