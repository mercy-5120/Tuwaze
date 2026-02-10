//1.Import and configure package modulesat the top of the file
const mysql = require("mysql2");
const express = require("express");
const session = require("express-session");
const { getGenderCount } = require("./utilityFunctions");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  database: "tuwaze",
  user: "root",
  password: "sonnie2006.",
  port: 3306,
});
//2. Register middleware functions to handle incoming requests and responses
app.use(
  session({
    secret: "encryptionKey",
    resave: false,
    saveUninitialized: true,
    options: { secure: true, expires: new Date(Date.now() + 60 * 60 * 1000) }, //expires in 1 hour
  }),
);
let isLoggedIn;
let loggedInUser;
const privateRoutes = ["/dashboard", "/profile"];
app.use((req, res, next) => {
  console.log("Middleware function executed!");
  if (req.session.user) {
    isLoggedIn = true;
    loggedInUser = req.session.user;
  } else {
    isLoggedIn = false;
  }
  if (isLoggedIn || !privateRoutes.includes(req.path)) {
    next();
  } else {
    res.status(401).send("Unauthorized!!!");
  }
});
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (form data)
//3. Register routes/pages/endpoint handlers
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
  //encodes the form data and makes it available in req.body
  console.log(req.body);
  const insertStatement = `INSERT INTO users (full_name, phone_number, email, gender, password_hash, role, ward, is_anonymous_allowed) VALUES
('${req.body.fullname}', '${req.body.phone}', '${req.body.email}', '${req.body.gender}', '${req.body.password}', 'citizen', '${req.body.location}', TRUE)`;

  connection.query(insertStatement, (insertError) => {
    if (insertError) {
      res.status(500).send("Server Error!!!");
    } else {
      res.redirect("/login");
    }
  });

  //res.send("Data received!!!");
  //console.log(insertStatement);
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/auth", (req, res) => {
  console.log(req.body); //req.body.pass -- password in db
  connection.query(
    `SELECT * FROM users WHERE email = '${req.body.email}'`,
    (dbError, queryResult) => {
      if (dbError) {
        console.log("DB error occurred: " + dbError.message);
        res.status(500).send("Server error");
      } else {
        console.log(queryResult);
        if (queryResult.length > 0) {
          if (req.body.password === queryResult[0].password_hash) {
            //passwords match, user is authenticated
            req.session.user = queryResult[0]; //store user info in session manager
            res.redirect("/dashboard");
            //password is wrong, authentication failed
          } else {
            res.send("Invalid email or password");
          }
        } else {
          res.send("Invalid email or password");
        }
      }
    },
  );
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
        labels: ["Male", "Female", "Other", "Prefer not to say"],
        datasets: [
          {
            data: [
              genderCount.male,
              genderCount.female,
              genderCount.other,
              genderCount.prefer_not_to_say,
            ],
            backgroundColor: ["#0358B6", "#F46300", "#8E44AD", "#7F8C8D"],
            hoverBackgroundColor: ["#198ed6", "#d69264", "#cb89e1", "#95A5A6"],
          },
        ],
      };

      res.render("dashboard.ejs", {
        allUsers: queryResult,
        maleFemaleCount: genderCount,
        chartData: JSON.stringify(chartData),
      });
    }
  });
});
//404 Handler - This should be the last route handler to catch all unmatched routes
app.use((req, res) => {
  res.status(404).render("404.ejs");
});

//4. Start the server and listen for incoming requests
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//look at bcrypt to hash and encrypt passwords before storing them in the database.
