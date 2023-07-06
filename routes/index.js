var express = require('express');
var router = express.Router();
let users = {}
/* GET home page. */
router.use(express.urlencoded({extended: false}))

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/todo", (req, res, next) => {
  let name = req.body.name;

  if (!users.hasOwnProperty(name)) {
    // Create a new user object
    users[name] = {
      name: name,
      todos: []
    };
    users[name].todos.push(req.body.todos);
    res.render("status", {status: "User added"})
  } else {
    users[name].todos.push(req.body.todos);
    res.render("status", {status: "Todo added"})
  }
})

router.get("/user", (req,res,next) =>{
  res.redirect("/user/"+req.query.id)
})

/*router.post("/user", (req,res,next) =>{
  console.log(req.body)
  res.redirect(307, "/user/"+req.body.delete)
})*/

router.get("/user/:id", (req,res,next) => {
  if(users.hasOwnProperty(req.params.id)){
    res.render("status", {status: "User found", name: users[req.params.id].name, todos: users[req.params.id].todos})
  } else {
    res.render("status", {status: "User not found", name: null, todos: null})
  }
})

router.delete("/user/:id", (req,res,next) => {
  try {
    if (req.params.id in users){
      delete users[req.params.id]
      res.render("status", {status: "User successfully deleted!", name: null, todos: null})
    } else {
      throw new Error("No such a user")
    }
  } catch(error){
    res.render("status", {status: "User not found", name: null, todos: null})
  }
})

module.exports = router;
