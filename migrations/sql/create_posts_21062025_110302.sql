-- public.posts definition

-- Drop table

-- DROP TABLE public.posts;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
	slug VARCHAR(255) NOT NULL UNIQUE CHECK (length(trim(slug)) > 0),
	description TEXT,
	thumbnail VARCHAR(255),
	tags TEXT[],
	authors JSONB,
	published BOOLEAN NOT NULL DEFAULT false,
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	updated_at TIMESTAMP,
	"status" BOOLEAN NOT NULL DEFAULT true,
	is_deleted BOOLEAN NOT NULL DEFAULT false
);


CREATE INDEX IF NOT EXISTS idx_posts_authors_gin ON public.posts USING GIN(authors);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status, is_deleted);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at);


COMMENT ON TABLE public.posts IS 'Main posts/articles table';
COMMENT ON COLUMN public.posts.slug IS 'URL-friendly identifier';
COMMENT ON COLUMN public.posts.authors IS 'JSON array of author information';



-- public.post_contents definition

-- Drop table

-- DROP TABLE public.post_contents;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.post_contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	parent_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
	content JSONB NOT NULL,
	"status" BOOLEAN NOT NULL DEFAULT true,
	is_deleted BOOLEAN NOT NULL DEFAULT false,
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_post_contents_content_gin ON public.post_contents USING GIN(content);

CREATE INDEX IF NOT EXISTS idx_post_contents_parent_id ON public.post_contents(parent_id);
CREATE INDEX IF NOT EXISTS idx_post_contents_status ON public.post_contents(status, is_deleted);

COMMENT ON TABLE public.post_contents IS 'Post content versions and drafts';
COMMENT ON COLUMN public.post_contents.content IS 'JSON structure containing post body content';