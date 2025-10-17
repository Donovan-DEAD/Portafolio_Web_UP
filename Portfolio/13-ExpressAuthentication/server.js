import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv, { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import process from "process";
import session from "express-session";
import fs from "fs";


dotenv.config(".env");

const app = express();
const __dirname = path.resolve();

const config_creds = JSON.parse(fs.readFileSync(__dirname + "\\secrets\\google_creds.json"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Conection with mongo
const mongoUrl = "mongodb://127.0.0.1:27017/LOTR";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  secret: String,
  googleid : String
});
userSchema.plugin(passportLocalMongoose);
userSchema.set("strictQuery", true);

const User = mongoose.model("User", userSchema);

// Configuration of google strategy
passport.use(new GoogleStrategy({
  clientID: config_creds.web.client_id,
  clientSecret: config_creds.web.client_secret,
  callbackURL: config_creds.web.redirect_uris[0]
  },
  async (accessToken, refreshToken, profile, cb) => {

    const user = await User.findOne({ googleid: profile.id })

    if (user) {
      return cb(null, user);
    } else{
      const newUser = new User({
          googleid: profile.id,
          username : profile.displayName,
          email :  profile.emails[0].value,
          secret : "",  
      })

      const savedUser =await newUser.save();
      return cb(null, savedUser);
    }
  }
));

// Configurando estrategia de seguridad
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
    httpOnly: true,
  }
}))
app.use(passport.initialize());
app.use(passport.session())


// views routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/secrets", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.render("secrets.ejs",{
    user :  req.user,
  });
});

app.get("/submit",(req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  }

  res.render("submit.ejs");
});

// Routes of the api.
const apiRouter = express.Router();

apiRouter.post("/register", (req, res) => {

  User.register({ username: req.body.username, email: req.body.email, secret: "" ,  googleid: ""}, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
})})

apiRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}))

apiRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

apiRouter.post("/submit", async(req, res) => {
  const submittedSecret = req.body.secret;
  // Al parecer ya no acepta las queries sino que devuelve directamente las queries.
  const foundUser = await User.findById(req.user.id)

  if (foundUser) {
    foundUser.secret = submittedSecret;
    await foundUser.save();
    res.redirect("/secrets");
  } else {
    res.redirect("/login");
  }
})

apiRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email", "openid"] }));

apiRouter.get("/auth/google/secrets", passport.authenticate("google", { failureRedirect: "/" }), (req, res)=>{
  res.redirect("/secrets");
})

app.use("/api", apiRouter);


// Starting server
app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
