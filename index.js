const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

//Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: true}));

// Basic route
app.get("/", (req, res) => {
  res.json({message: "Hi there!"})
});

const PORT = process.env.PORT || 1995;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
