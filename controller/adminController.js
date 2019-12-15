const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

const User = require("../models/User")

exports.login = (req, res) => {
    let message = "";
    res.render("login", { message: message })
}

exports.proses = (req, res) => {
    let data = req.body
    console.log(data)
    res.send(data)
}

exports.token = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Email Tidak Ada!" });
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched
                        const payload = { id: user.id, name: user.name };

                        // Create JWT Payload
                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    "status": 200, "error": null, "token": token
                                });
                            }
                        );
                    }
                    else {
                        return res.status(400).json({ error: "Password Salah!" });
                    }
                });
        })
        .catch(err => console.log(err));
}