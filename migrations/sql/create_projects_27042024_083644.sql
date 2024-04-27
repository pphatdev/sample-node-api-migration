-- public.projects definition

-- Drop table

-- DROP TABLE public.projects;

CREATE TABLE IF NOT EXISTS public.projects (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) ,
	icon VARCHAR(255) NOT NULL,
	live VARCHAR(255) NOT NULL,
	source VARCHAR(255) NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT true,
	is_deleted BOOLEAN NOT NULL DEFAULT false,
	created_date DATE NOT NULL DEFAULT now()
);