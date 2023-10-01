const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { trusted } = require("mongoose");
const app = express();
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const bcrypt = require("bcrypt");
const auth = require("./auth");

app.use(cors());
app.use(bodyParser.json());

const payload = {
  iss: "peYzV6ACSnCwgfKVkW0eHQ",
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, "RxpjTYdWYsoIfoLg4Po2WO47bmGmVyVeulfH");

mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

const Schema = mongoose.Schema;
const doctorsSchema = new Schema({
  username: { unique: true, type: String , maxLength: 20},
  name: { type: String },
  degree: String,
  catagory: String,
});
const Doctors = mongoose.model("Doctors", doctorsSchema);

const AppSchema = new Schema(
  {
    username: { type: String, required: true },
    doc_name: { type: String, required: true },
    date: { type: String, required: true },
    start_time: { type: String, required: true },
    is_booked: { type: Boolean, default: false },
    patient_email: { type: String, maxLength: 30 },
    patient_name: { type: String, maxLength: 20 },
    meeting_url: { type: String },
    meeting_pass: { type: String },
    patient_accemail: { type: String, required: true }
  },
  { versionKey: false }
);

const AppSlot = mongoose.model("AppSlot", AppSchema);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
})

const User = mongoose.model("User", UserSchema);



app.get("/dataload", async (req, res) => {
  try {
    const doctors = await Doctors.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get('/search', async (req,res) => {
const { q } = req.query;
try{
  const doctors = await Doctors.find({username: { $regex: q, $options: 'i' } });
  res.json(doctors);
}catch(err){
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}
});

app.get("/view_app", auth, async (req, res) => {
  try {
    const slots = await AppSlot.find({ patient_accemail: req.user.userEmail });
    res.json(slots);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/check", async (req, res) => {
  const t = req.body.time;
  const usn = req.body.usname.username;
  const date = req.body.date;
  // console.log(t, usn, date);
  try {
    const time = await AppSlot.find({
      start_time: t,
      username: usn,
      date: date,
    });
    // console.log(time[0].is_booked);
    res.send(time[0].is_booked);
  } catch (err) {
    res.status(406).send("Server error");
  }
});

app.post("/bookslot", auth, async (req, res) => {
  const time = req.body.time;
  const username = req.body.username;
  const date = req.body.date;
  const is_booked = req.body.check;
  const patient_email = req.body.patient_email;
  const patient_name = req.body.patient_name;
  const doctors = await Doctors.findOne({ username: username });
  const book = new AppSlot({
    username: username,
    doc_name:doctors.name,
    date: date,
    start_time: time,
    is_booked: is_booked,
    patient_email: patient_email,
    patient_name: patient_name,
    patient_accemail: req.user.userEmail
  });
  const x = book.save();

  //  Zoom Api
  email = "naveedqadir0@gmail.com";
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    body: {
      topic: "Slot booked for : " + patient_name, //meeting title
      start_time: date + "T" + time + ":00",
      duration: 30,
    },
    json: true, //Parse the JSON string in the response
  };

  requestPromise(options)
    .then(function (response) {
      var details = { url: response["join_url"], pass: response["password"] };
      var meeting_url = response["join_url"];
      var meeting_pass = response["password"];

      AppSlot.findOne({ date: date, start_time: time, username: username })
        .then((foundObject) => {
          foundObject.meeting_url = meeting_url;
          foundObject.meeting_pass = meeting_pass;
          foundObject.save();
        })
        .catch((error) => {
          console.error("Error finding object:", error);
        });

// Sendin blue for mail sending..

  const tranEmailApi = new Sib.TransactionalEmailsApi()
  const sender = {
      email: 'naveedqadir0@gmail.com',
      name: 'Naveed',
  }
  const receivers = [
      {
          email: patient_email,
      },
  ]
  
  tranEmailApi
      .sendTransacEmail({
          sender,
          to: receivers,
          subject: 'Your Appointment has been Booked',
          htmlContent: `
          <h1>Here are the Appointment Details for {{params.name}}</h1>
          <h2>Zoom Meeting Details</h2>
          <a href="{{params.url}}">Click here to Join</a>
          <p>Meeting Password: {{params.pass}} </p>
          <p>Date : {{params.date}} <br> Time : {{params.time}} </p>
                  `,
          params: {
              name: patient_name,
              url: meeting_url,
              pass: meeting_pass,
              date: date,
              time: time
          },
      })
      .then(console.log)
      .catch(console.log)

      res.send(details);
    })
    .catch(function (err) {
      res.status(500).send("Error");
    });
});

app.get("/auth-endpoint",  auth, (request, response) => {
  response.json({ isAuthenticated: true });
});

app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
