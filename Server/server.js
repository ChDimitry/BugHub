const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
// Serve the client-side code from the 'build' folder
app.use(express.static(path.join(__dirname, "../Client/build")));

const uri =
  "mongodb+srv://bughubber:omerdima123@cluster0.nzfvlqf.mongodb.net/bughub?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
// Define a schema for user data
const userSchema = new mongoose.Schema({
  user_id: Number,
  username: String,
  password: String,
  is_connected: Boolean,
  is_admin: Boolean,
});

// define a model for your data
const User = mongoose.model("User", userSchema);

// Define a route to get all users
app.get("/api/getAllUsers", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// define a schema for your bug data
const bugSchema = new mongoose.Schema({
  bug_id: Number,
  project: String,
  severity: String,
  urgent: Boolean,
  name: String,
  added_by: String,
  version: String,
  date: String,
  solved: Boolean,
  reproduction_steps: String,
  environment: String,
  assigned_dev: String,
  comments: String,
  error_stack: String,
  solution: String,
});

// define a model for your data
const Bug = mongoose.model("Bug", bugSchema);

// Define a route to get all bugs
app.get("/api/getAllBugs", async (req, res) => {
  try {
    const allBugs = await Bug.find({});
    res.json(allBugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define a route to add a new bug
app.post("/api/addBug", async (req, res) => {
  try {
    const newBug = new Bug(req.body);
    await newBug.save();
    res.json({ message: "Bug added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define a route to delete a bug by _id
app.delete("/api/getAllBugs/:id", (req, res) => {
  const id = req.params.id;
  Bug.findByIdAndDelete(id)
    .then((deletedBug) => {
      if (!deletedBug) {
        res.status(404).send(`Bug with ID ${id} not found`);
      } else {
        res.status(200).send(`Bug with ID ${id} deleted successfully`);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Define a route to edit a bug by _id
app.put("/api/getAllBugs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBug = await Bug.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedBug) {
      res.status(404).send(`Bug with ID ${id} not found`);
    } else {
      res.json(updatedBug);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Serve the client-side code for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
