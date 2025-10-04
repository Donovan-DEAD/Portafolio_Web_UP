import express from "express";
import path from "path";


const app = express();
const parser = express.urlencoded({ extended: false });
const jsonParser = express.json();

app.use(parser);
app.use(jsonParser);

// TODO: configure the express server
const __dirname = path.resolve();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));



const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home",{
    name: name,
    posts: posts
  });
});

app.post("/posts", (req, res)=>{
  posts.push({
    title: req.body.title,
    content: req.body.content,
    author : req.body.author,
    date: req.body.date,
    summary: req.body.summary
  });

  res.redirect("/home"); 
})

app.post("/posts/update/:id", (req, res) => {

  posts[req.params.id] = {
    title: req.body.title.trim(),
    content: req.body.content.trim(),
    author : req.body.author.trim(),
    date: req.body.date,
    summary: req.body.summary.trim(),
  }
  res.redirect("/posts/" + req.params.id);
})

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((_,index) => index != req.params.id);
  res.redirect("/home");
})

app.get("/posts/:id", (req, res) => {
  console.log(req.params.id);
  console.log(posts[req.params.id]);
  res.render("posts", {
    post: posts[req.params.id],
    id : req.params.id,
  });
})

app.get("/login", (req, res) => {
  name = req.query.name;

  res.render("test", {
    name: "Hello, " + name ,
    security: "insecure"
  });
});

app.post("/login", (req, res) => {
  name = req.body.name;

  res.render("test", {
    name: "Hello, " + name ,
    security: "secure"
  });
});




app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
