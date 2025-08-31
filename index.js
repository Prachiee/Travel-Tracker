
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456", // update with your actual password
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Helper function: fetch all visited countries
async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  return result.rows.map((country) => country.country_code);
}

// GET home page
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    res.render("index.ejs", { 
      countries: countries, 
      total: countries.length 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading data");
  }
});

// INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"].trim();

  try {
    // Case-insensitive + partial match
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' LIMIT 1;",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      const countries = await checkVisited();
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country name does not exist, try again.",
      });
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.error(err);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.error(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Something went wrong, please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
