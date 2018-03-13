const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const bcrypt = require('bcrypt');
const HASH_FACTOR = 10;


const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  secret: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.pre('save', function(next) {    //function (next)¿?
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(HASH_FACTOR)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next();
                });
        })
        .catch(error => next(error));
});

const User = mongoose.model("User", userSchema);
module.exports = User;
