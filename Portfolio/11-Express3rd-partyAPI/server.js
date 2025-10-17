const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const city = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    res.render("weather", {
      city: city,
      temp: temp,
      weatherDescription: weatherDescription,
      imageURL: imageURL,
    });
  } catch (error) {
    res.render("error", { error: error.response.data });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});