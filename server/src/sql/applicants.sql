CREATE TABLE applicants (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	cohort_id BIGINT NOT NULL REFERENCES cohorts(id),
	name VARCHAR(40) NOT NULL,
	earnings_potential SMALLINT NOT NULL,
	hours_needed SMALLINT NOT NULL
);
