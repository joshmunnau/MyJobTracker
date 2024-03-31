const express = require("express");
const passport = require("passport"); // Step 1: Import passport
require("./config/passportConfig"); // Step 2: Configure passport
const usersRouter = require("./routes/userRoutes"); // Assuming this handles registration
const jobsRouter = require("./routes/jobRoutes"); // Handles job fetching
const cors = require("cors"); // Import CORS
const app = express();

// Use CORS
app.use(
  cors({
    origin: "https://joshmunnau.github.io", // Adjust depending on your frontend's origin
    credentials: true, // Set to true if your frontend needs to send cookies or authorization headers
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
