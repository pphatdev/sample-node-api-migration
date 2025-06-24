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