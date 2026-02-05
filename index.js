const mysql = require("mysql2");
const express = require("express");
const {getGenderCount} = require("./utilityFunctions")
const app = express();



const connection = mysql.createConnection({
  host: "localhost",
  database: "tuwaze",
  user: "root",
  password: "sonnie2006.",
  port: 3306,
});

app.get("/", (req, res)=>{
  res.render("home.ejs")
});

app.get("/signup", (req, res)=>{
  res.render("signup.ejs")
});

app.post("/signup",express.urlencoded({extended: true}), (req, res) => {//encodes the form data and makes it available in req.body
  console.log(req.body);
  const insertStatement = `INSERT INTO users (full_name, phone_number, email, gender, password_hash, role, ward, is_anonymous_allowed) VALUES
('${req.body.fullname}', '${req.body.phone}', '${req.body.email}', '${req.body.gender}', '${req.body.password}', 'citizen', '${req.body.location}', TRUE)`;

connection.query(insertStatement, (insertError)=>{
  if(insertError){
    res.status(500).send("Server Error!!!");
  }else{
    res.redirect("/login");
  }
})

  //res.send("Data received!!!");
  //console.log(insertStatement);
  
});

app.get("/login", (req, res)=>{
  res.render("login.ejs")
});

app.get("/dashboard", (req, res) => {
  connection.query("SELECT * FROM users;", (dbError, queryResult) => {
    if (dbError) {
      console.log("DB error occurred: " + dbError.message);
      res.status(500).send("Database error");
    } else {
      const genderCount = getGenderCount(queryResult);
      console.log(genderCount);
      
      // Prepare data for the chart
      const chartData = {
        labels: ['Male', 'Female'],
        datasets: [{
          data: [genderCount.male, genderCount.female],
          backgroundColor: ['#0358B6', '#F46300'],
          hoverBackgroundColor: ['#44DE28', '#D60000']
        }]
      };
      
      res.render("dashboard.ejs", {
        allUsers: queryResult, 
        maleFemaleCount: genderCount,
        chartData: JSON.stringify(chartData)
      });
    }
  });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//look at bcrypt to hash and encrypt passwords before storing them in the database.