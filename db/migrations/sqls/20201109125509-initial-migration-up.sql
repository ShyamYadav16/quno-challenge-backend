CREATE TABLE doctors (
  id                  serial PRIMARY KEY,
  name                TEXT NOT NULL,
  city                TEXT NOT NULL,
  country             TEXT NOT NULL,
  avatar_url           TEXT NOT NULL,
  quno_score_number     TEXT NOT NULL,
  ratings_average      TEXT NOT NULL,
  treatments_last_year  INTEGER NOT NULL,
  years_experience     INTEGER NOT NULL,
  base_price           TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL
);