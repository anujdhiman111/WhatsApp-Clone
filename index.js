const { urlencoded } = require("express");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const authToken = require('./verifyToken')
app.use(urlencoded({extended:true}));
app.use(express.json());
const port = 5000;
mongoose.connect("mongodb+srv://anuj:1234567890@cluster0.3yuzuan.mongodb.net/whatsapp");

const user = mongoose.model('user',{
   name : String,
   username:String,
   password : String,
   rooms:Array
});

const room = mongoose.model('room',{
	name : String,
	participants:Array
 });

app.post('/addUser',(req,res)=>{
   console.log(req.body);
   user.find({},function(err,data){
		let users = data;
      // console.log(users.length)
		if(users.length === 0){
			// users = []
			// users.push(req.body);
			req.body.rooms = []
			let newUser  = new user(req.body);
			newUser.save();
			res.send("")
			return;
		}
		else{
         for(let u of users){
				if(u.username === req.body.username){
               res.send("Same");
               return;
				}
			}
         let newUser = new user(req.body)
         newUser.save();
         res.send("")
		 return;
		}
	})
})

app.post('/checkData',function(req,res){
	let loginData = req.body;
	user.find({},function(err,data){
		let newData = data;
		for(let user of newData){
			if(user.username == loginData.username && user.password == loginData.password){
				const token = jwt.sign({ id: user._id, name:user.name}, "ProCoder");
				return res.cookie("access_token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
				  })
				  .status(200)
				  .json({ message: "Logged in successfully 😊 👌" });
			}
		}
      res.send("");
      return;
	})
})

app.get('/fetchData',(req,res)=>{
	user.find({},(err,data)=>{
		res.send(data)
		return;
	})
})

app.post('/checkToken', authToken,(req,res)=>{
	res.send(req.user)
	return;
})

 app.listen(port,console.log(`Server running at ${port}`));
