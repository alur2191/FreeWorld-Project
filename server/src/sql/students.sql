CREATE TABLE students (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	cohort_id BIGINT NOT NULL REFERENCES cohorts(id),
	applicant_id BIGINT NOT NULL REFERENCES applicants(id),
	name VARCHAR(40) NOT NULL,
);