import express from "express";
const app = express();
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const teamSchema = new mongoose.Schema({
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

const dataSeeder = async (req, res, next) => {
  const count = await Driver.countDocuments();
  if (count === 0) {
    fs.readFile(__dirname + '/public/data/f1_2023.csv', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const lines = data.split('\n').slice(1);
      for (let line of lines) {
        const values = line.split(',');
        if (values.length >= 8) {
          const [number, code, forename, surname, dob, nationality, url, teamName] = values;
          let team = await Team.findOne({ name: teamName });
          if (!team && teamName !== 'N/A') {
            team = new Team({ name: teamName });
            await team.save();
          }
          const driver = new Driver({
            num: number,
            code: code,
            forename: forename,
            surname: surname,
            dob: new Date(dob.split('/').reverse().join('-')),
            nationality: nationality,
            url: url,
            team: team ? team._id : null
          });
          await driver.save();
        }
      }
      console.log("Base de datos cargada con éxito.");
      next();
    });
  } else {
    next();
  }
};

const loadData = async (req, res, next) => {
    const sortBy = req.query.sortBy;
    let sortQuery = { num: 1 };

    if (sortBy === 'team') {
        req.drivers = await Driver.find().populate('team');
        req.drivers.sort((a, b) => {
            if (!a.team || !b.team) return 0;
            return a.team.name.localeCompare(b.team.name);
        });
    } else {
        req.drivers = await Driver.find().sort(sortQuery).populate('team');
    }

    req.teams = await Team.find();
    next();
}

app.get("/", dataSeeder, loadData, (req, res) => {
  res.render("index", { drivers: req.drivers, teams: req.teams, driverToEdit: null, teamsOptions: req.teams });
});

app.post('/add', async (req, res) => {
    const { num, code, forename, surname, dob, nationality, url, team } = req.body;
    const newDriver = new Driver({
        num, code, forename, surname, dob, nationality, url, team
    });
    await newDriver.save();
    res.redirect('/');
});

app.get('/edit/:id', loadData, async (req, res) => {
    const driverToEdit = await Driver.findById(req.params.id);
    res.render('index', { drivers: req.drivers, teams: req.teams, driverToEdit, teamsOptions: req.teams });
});

app.post('/update/:id', async (req, res) => {
    const { num, code, forename, surname, dob, nationality, url, team } = req.body;
    await Driver.findByIdAndUpdate(req.params.id, {
        num, code, forename, surname, dob, nationality, url, team
    });
    res.redirect('/');
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
