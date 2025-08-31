CREATE TABLE countries (
  country_code VARCHAR(3) PRIMARY KEY,
  country_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(3) REFERENCES countries(country_code) UNIQUE
);
