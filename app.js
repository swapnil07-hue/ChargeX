const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const flash = require("connect-flash");
const { title } = require("process");
const cors = require("cors");
const Razorpay = require("razorpay");
const Admin = require("./models/admin");

const MONGO_URL = "mongodb://127.0.0.1:27017/PlugNGoX";
app.use(express.json());
app.set("view engine", "ejs");
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

// SESSION CONFIGURATION
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
app.use(session(sessionOptions));
app.use(flash());

// PASSPORT CONFIGURATION (Place Before Routes)
app.use(passport.initialize());
app.use(passport.session());

// Fix: Tell Passport to use 'email' instead of 'username'
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // Use email instead of username
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: "No user found with this email.",
          });
        }

        // Passport-Local-Mongoose provides a built-in "authenticate" method
        const { user: authenticatedUser, error } = await user.authenticate(
          password
        );

        if (error) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, authenticatedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser(), async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// Admin Passport Configuration
passport.use(
  "admin-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // Using email instead of username
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return done(null, false, {
            message: "No admin found with this email.",
          });
        }

        // Passport-Local-Mongoose provides a built-in "authenticate" method
        const { user: authenticatedAdmin, error } = await admin.authenticate(
          password
        );

        if (error) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, authenticatedAdmin);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());

// Serialize user/admin
passport.serializeUser((userOrAdmin, done) => {
  done(null, { id: userOrAdmin.id, type: userOrAdmin instanceof Admin ? "Admin" : "User" });
});

// Deserialize based on type
passport.deserializeUser(async (obj, done) => {
  try {
    if (obj.type === "Admin") {
      const admin = await Admin.findById(obj.id);
      done(null, admin);
    } else {
      const user = await User.findById(obj.id);
      done(null, user);
    }
  } catch (err) {
    done(err);
  }
});


// GLOBAL VARIABLES FOR FLASH MESSAGES
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // Make user available in all views
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// DATABASE CONNECTION
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB.");
}
main().catch((err) => console.log(err));

// ROUTES
app.get("/home", (req, res) => {
  res.render("home.ejs");
});

// STATIONS LISTING
app.get("/stations", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("station.ejs", { allListings });
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.send(allListings);
});

app.get("/stations/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "Please log in first");
    return res.redirect("/login");
  }
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
});

// SIGNUP ROUTE
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  const { name, email, username, phoneNumber, password } = req.body;
  try {
    const newUser = new User({ name, email, username, phoneNumber });
    const registeredUser = await User.register(newUser, password);

    req.flash("success_msg", "Welcome to PlugNGoX");
    res.redirect("/login");
    console.log(registeredUser);
  } catch (err) {
    req.flash("error_msg", "Error in registration: " + err.message);
    res.redirect("/signup");
  }
});

// LOGIN ROUTE
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// app.post("/login", (req, res, next) => {
//   console.log("Login attempt with:", req.body); // Debugging step

//   passport.authenticate("local", {
//     successRedirect: "/home",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })(req, res, next);

// });

app.post("/login", (req, res, next) => {
  console.log("Login attempt with:", req.body); // Debugging step

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      req.flash("error_msg", "Something went wrong. Please try again.");
      return next(err);
    }
    if (!user) {
      req.flash("error_msg", info.message || "Invalid email or password.");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        req.flash("error_msg", "Login failed. Please try again.");
        return next(err);
      }
      req.flash("success_msg", "successfully loign!!");
      const searchQuery = req.query.query || ""; // Extract search query
      return res.redirect("/dashboard");
    });
  })(req, res, next);
});

app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "Please log in first");
    return res.redirect("/login");
  }
  const searchQuery = req.query.query || ""; // Extract search query
  console.log("Received search query:", searchQuery);
  res.render("dashboard.ejs", { user: req.user, searchQuery });
});

//show
app.get("/show", (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "Please log in first");
    return res.redirect("/login");
  }
  res.render("show.ejs");
});

//admin
app.get("/admin_signup", (req, res) => {
  res.render("admin_signup.ejs");
});

app.post("/admin_signup", async (req, res) => {
  const { name, email, username, phoneNumber, password } = req.body;
  try {
    const newAdmin = new Admin({ name, email, username, phoneNumber });
    const registeredAdmin = await Admin.register(newAdmin, password);

    req.flash("success_msg", "Welcome to PlugNGoX");
    res.redirect("/adminlogin");
    console.log(registeredAdmin);
  } catch (err) {
    req.flash("error_msg", "Error in registration: " + err.message);
    res.redirect("/admin_signup");
  }
});

app.get("/adminlogin", (req, res) => {
  res.render("admin_login.ejs");
});
//admin login
app.post("/adminlogin", (req, res, next) => {
  console.log("Login attempt with:", req.body); // Debugging step

  passport.authenticate("admin-local", (err, admin, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      req.flash("error_msg", "Something went wrong. Please try again.");
      return next(err);
    }
    if (!admin) {
      req.flash("error_msg", info.message || "Invalid email or password.");
      return res.redirect("/adminlogin");
    }

    req.logIn(admin, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        req.flash("error_msg", "Login failed. Please try again.");
        return next(err);
      }
      req.flash("success_msg", "successfully loign!!");
      const searchQuery = req.query.query || ""; // Extract search query
      return res.redirect("/admin_dashboard");
    });
  })(req, res, next);
});

app.get("/admin_dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "Please log in first");
    return res.redirect("/adminlogin");
  }
  const searchQuery = req.query.query || ""; // Extract search query
  console.log("Received search query:", searchQuery);
  res.render("admin_Dashboard.ejs", { user: req.user, searchQuery });
});


// POST - Add new station
app.post("/stations/add", async (req, res) => {
  try {
    const {
      name,                // comes from <input name="name">
      description,         // comes from <input name="description">
      image,
      city,
      state,
      Available_slots,     // note: in form you used capital A
      slots,               // total slots
      price                // in schema it's price_per_slot
    } = req.body;

    // Create new station
    const newStation = new Listing({
      title: name,                        // map "name" from form → "title" in schema
      description,
      image,
      city,
      state,
      available_slots: Available_slots,   // form "Available_slots" → schema "available_slots"
      total_slots: slots,                 // form "slots" → schema "total_slots"
      price_per_slot: price               // form "price" → schema "price_per_slot"
    });

    // Save to MongoDB
    await newStation.save();

    // Redirect back with success message
    req.flash("success", "Station added successfully!");
    res.redirect("/admin_dashboard");   // adjust route as per your app
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong while adding station.");
    res.redirect("/admin_dashboard");
  }
});

//payment
app.post("/payment", async (req, res) => {
  let { amount } = req.body;

  var instance = new Razorpay({
    key_id: "rzp_test_fruguUDc8PALxa",
    key_secret: "NbAb6sJJ7k3i6HfVCzbD4sIB",
  });

  let order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1, // 🔹 Enable auto-capture here
  });

  res.status(201).json({
    success: true,
    order,
    amount,
  });
});

app.get("/help", (req, res) => {
  res.render("help.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

//logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      req.flash("error_msg", "Logout failed. Please try again.");
      return res.redirect("/home");
    }
    req.flash("success_msg", "You have been logged out.");
    res.redirect("/home");
  });
});

// **SERVER LISTENING**
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});