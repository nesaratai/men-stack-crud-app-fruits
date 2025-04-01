const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file


// We begin by loading Express
const express = require('express');
const mongoose = require("mongoose"); // require package




const app = express();
app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
const Fruit = require("./models/fruit.js");



app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

app.post("/fruits", async (req, res) => {

    console.log("Before",req.body)

    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }

      console.log("After",req.body)

      await Fruit.create(req.body);
    res.redirect("/fruits");
  });

app.get("/fruits", async (req, res) => {

    // Get all the fruits from the database
    const allFruits = await Fruit.find();

    // Render the page that shows all the fruits
    res.render("fruits/index.ejs", { fruits: allFruits });

  });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
