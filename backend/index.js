const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors({ credentials: true, methods: "GET, POST" }));
var jwt = require("jsonwebtoken");
let mongoose = require("mongoose");
username = "riddhi";
password = "riddhi12";
dbName = "User_Login";
mongoDBUri = `mongodb+srv://${username}:${password}@cluster0.ubzu3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;
app.listen(port, () => {
  console.log(port);
});

const User = require("./model/user");
app.post("/UserCheck", (req, res) => {
  User.findOne({ mobile: req.body.phoneno })
    .then((result) => {
      if(result != null){
        const payload = {
        fname: result.firstName,
        lname: result.lastName,
        email: result.email,
        mobile:result.mobile,
        id: result._id,
      };
      jwt.sign(payload, (privateKey = "user"), (err, usertoken) => {
        res.json({success: true, tokan: "Bearer " + usertoken,
        });
      })
      }else{
      res.status("200").json(result);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/Registration", (req, res) => {
  let user = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    mobile: req.body.mobile,
  };
  new User(user)
    .save()
    .then((result) => {
      const payload = {
        fname: result.firstName,
        lname: result.lastName,
        email: result.email,
        mobile:result.mobile,
        id: result._id,
      };
      jwt.sign(payload, (privateKey = "user"), (err, usertoken) => {
        res.json({success: true, tokan: "Bearer " + usertoken,
        });
      })

    })
    .catch((err) => {
      console.log(err);
    });
});
