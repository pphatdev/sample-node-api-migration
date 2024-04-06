-- public.example definition

-- Drop table

-- DROP TABLE public.example;

CREATE TABLE IF NOT EXISTS public.example (
	id SERIAL PRIMARY KEY,
	-- your field name
	"status" BOOLEAN NOT NULL DEFAULT true,
	is_deleted BOOLEAN NOT NULL DEFAULT false,
	created_date DATE NOT NULL DEFAULT now()
);