import express from "express"
import path from "path"

const app = express()
const __dirname = path.resolve()

const greetedNames = []
var tasks = []

const parser = express.urlencoded({ extended: false });
const jsonParser = express.json();

app.use(parser);
app.use(jsonParser);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) =>{
    res.render("index", {names: greetedNames, tasks: tasks})
})

// , express.json() 
app.get("/greet",(req, res)=>{
    const name = req.query.name
    
    if(name && !greetedNames.includes(name)){
        greetedNames.push(name)
    }
    
    res.render("wazzup", {name: req.query.name, tasks : tasks})
} )

app.put("/greet", (req, res)=>{
    const name = req.body.name
    
    if(name && !greetedNames.includes(name)){
        greetedNames.push(name)
    }

    res.send(JSON.stringify(greetedNames))
})

app.get("/task", (req, res)=>{
    res.send(JSON.stringify(tasks))
})

app.post("/task", (req, res)=>{
    tasks.push(req.body)

    res.redirect("/")
})

app.put("/task", (req, res)=>{
    const action = req.body.action
    const index_to_update = Number(req.body.index)

    if(action ==="down" && index_to_update < (tasks.length-1)){
        
        const temp = tasks[index_to_update]
        tasks[index_to_update] = tasks[index_to_update+1]
        tasks[index_to_update+1] = temp

    } else if (action === "up" && index_to_update > 0){
        
        const temp = tasks[index_to_update]
        tasks[index_to_update] = tasks[index_to_update-1]
        tasks[index_to_update-1] = temp

    }

    res.redirect("/")
})

app.delete("/task", (req, res)=>{
    const index_to_delete = req.body.index
    tasks = tasks.filter((_, ind)=>{
        return ind != index_to_delete
    })
    
    res.json({ success: true })
})

app.listen(3000, (err)=>{
    console.log("Listening on port 3000")
})