const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cors());

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);

const db = require("./app/models/index.model");

db.mongoose
  .connect(`mongodb://localhost:27017/your-database-name`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/auth.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
