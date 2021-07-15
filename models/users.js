const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    studyGuides: [{
        type: Schema.Types.ObjectId,
        ref: "StudyGuide"
    }]
});

userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})


//determine if the compare password is supposed to go here
userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }
  

const User = mongoose.model("User", userSchema);

module.exports = User;