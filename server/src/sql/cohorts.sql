CREATE TABLE cohorts (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	cohort_number BIGSERIAL,
	max_earnings INTEGER,
	max_hours SMALLINT NOT NULL,
	considered SMALLINT NOT NULL
);