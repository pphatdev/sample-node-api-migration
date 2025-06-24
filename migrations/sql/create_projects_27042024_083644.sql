-- public.projects definition

-- Drop table

-- DROP TABLE public.projects;

DROP TABLE IF EXISTS public.projects;

CREATE TABLE IF NOT EXISTS public.projects (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	image VARCHAR(255),
	published BOOLEAN NOT NULL DEFAULT true,
	tags TEXT[],
	source JSONB,
	authors JSONB,
	languages TEXT[],
	is_deleted BOOLEAN NOT NULL DEFAULT false,
	created_date TIMESTAMP NOT NULL DEFAULT now(),
	updated_date TIMESTAMP DEFAULT now()
);