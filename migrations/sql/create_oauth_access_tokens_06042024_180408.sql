-- public.oauth_access_tokens definition

-- Drop table

-- DROP TABLE public.oauth_access_tokens;

CREATE TABLE IF NOT EXISTS public.oauth_access_tokens (
	id varchar(100) NOT NULL,
	user_id int8 NULL,
	client_id int8 NOT NULL,
	"name" varchar(255) NULL,
	scopes text NULL,
	revoked bool NOT NULL,
	created_at timestamp(0) NULL,
	updated_at timestamp(0) NULL,
	expires_at timestamp(0) NULL,
	CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS oauth_access_tokens_user_id_index ON public.oauth_access_tokens USING btree (user_id);