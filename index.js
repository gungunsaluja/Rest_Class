const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// uuidv4();

app.use(express.urlencoded({ extended:true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req,res)=>{
    res.send("serving working well");
});

app.use(express.static(path.join(__dirname,"public")));




let posts = [
    {
        id: uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id: uuidv4(),
        username:"shradhaKhapra",
        content:"Hark work is important to achieve success"
    },
    {
        id: uuidv4(),
        username:"rahul",
        content:"I love coding!!"
    },
]
app.get("/posts",(req, res)=>{
    res.render("index.ejs", { posts });

});
app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
     posts= posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req, res)=>{
    let {username,content} = req,body;
    let id = uuidv4();
    posts.push({id, username, content });
    res.redirect("/posts");
})


// app.post("/posts",(req,res)=>{
//     let {username, content } = req.body;
//     posts.push({ username, content });
//     // res.send("post requests working");
//     res.redirect("/posts")
// });
app.get("/posts/:id", (req, res)=>{
   
    let { id } =  req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    // console.log(post);

    // res.send("request working");
    res.render("show.ejs",{post});

});
//update route patch request to update specific route

app.patch("/posts/:id",(req, res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    //console.log(newContent);
    let post = posts.find((p) =>id === p.id);
    post.content = newContent;
     console.log(post);
    // // console.log(id);
    // res.send("patch request working");
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) =>id===p.id);
    res.render("edit.ejs");
})
app.listen(port,()=>{
    console.log("listening to port : http://localhost:8080");
})