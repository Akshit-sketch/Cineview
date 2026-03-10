const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "reviews.json");

/* GET REVIEWS */
app.get("/reviews", (req, res) => {

fs.readFile(filePath, "utf8", (err, data) => {

if (err) return res.json([]);

res.json(JSON.parse(data));

});

});

/* ADD REVIEW */
app.post("/reviews", (req, res) => {

const review = req.body;

fs.readFile(filePath, "utf8", (err, data) => {

let reviews = [];

if (!err) {
reviews = JSON.parse(data);
}

reviews.push(review);

fs.writeFile(filePath, JSON.stringify(reviews, null, 2), err => {

if (err) return res.status(500).send("Error saving review");

res.json({ message: "Review added" });

});

});

});

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});