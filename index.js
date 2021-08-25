const express = require("express");
const app = express();
require("./auth");
const session = require('express-session');
const passport = require("passport");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get("/auth/google", (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] });
});

app.get("/google/callback", (req, res) => {
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  });
});

app.get("/auth/failure", (req, res) => {
  res.send("something went wrong");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("Helloo");
});

app.listen(5000, () => console.log("Server running"));
