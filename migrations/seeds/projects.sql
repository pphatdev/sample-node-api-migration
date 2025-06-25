INSERT INTO public.projects (name, description, image, published, tags, source, authors, languages) VALUES
(
    'King Mart eCommerce',
    'KING MART is one-stop shopping for customers, we are committed to establishing retail stores with a digital platform where customers can get high-quality products with competitive price.',
    'king-mart.shop.png',
    true,
    ARRAY['eCommerce', 'Laravel', 'JavaScript', 'Tailwind CSS'],
    '[{"url": "https://king-mart.shop", "name": "Live", "type": "demo"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}, {"name": "Hoeun Pichet", "profile": "https://github.com/HoeunPichet.png", "url": "https://github.com/HoeunPichet"}]'::jsonb,
    ARRAY['Laravel', 'JavaScript', 'Tailwind CSS']
),
(
    'Red Ant Express Cambodia',
    'Red Ant Express Co., Ltd. was established in 2022 based on the Certificate of Incorporation, dated on 11 January 2022, issued by the Ministry of Commerce. We intend to become the most respected and trustworthy delivery company in Cambodia.',
    'red-ant-express.com.kh.png',
    true,
    ARRAY['eCommerce', 'Laravel', 'JavaScript', 'Tailwind CSS'],
    '[{"url": "https://red-ant-express.com.kh", "name": "Live", "type": "demo"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}, {"name": "Hoeun Pichet", "profile": "https://github.com/HoeunPichet.png", "url": "https://github.com/HoeunPichet"}]'::jsonb,
    ARRAY['Laravel', 'JavaScript', 'Tailwind CSS']
),
(
    'eLibrary of Nintrea',
    'A website that gathers various types of information (text, images, audio, and video) for sharing and supporting the study and teaching of the Khmer language, intended for students, parents, and Khmer language teachers.',
    'elibraryofkhmer.blogspot.com.png',
    true,
    ARRAY['Blogspot', 'XML', 'JavaScript'],
    '[{"url": "https://elibraryofkhmer.blogspot.com", "name": "Live", "type": "demo"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}]'::jsonb,
    ARRAY['XML', 'JavaScript']
),
(
    'Nintrea Website',
    'A website for searching and reading books online. It is a web application that allows users to search for books, read them online. It is designed to be user-friendly and easy to navigate, making it a great resource for anyone looking to read books online.',
    'nintrea.top.png',
    true,
    ARRAY['NextJs', 'TypeScript', 'Tailwind CSS'],
    '[{"url": "https://github.com/nintrealab/nintrea.website", "name": "Live", "type": "source"}, {"url": "https://nintrea.top", "name": "Live", "type": "demo"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}, {"name": "Navy MEAN", "profile": "https://github.com/vyniivaa-dev.png", "url": "https://github.com/vyniivaa-dev"}, {"name": "Sithuch CHHEM", "profile": "https://github.com/sithuch.png", "url": "https://github.com/sithuch"}]'::jsonb,
    ARRAY['NextJs', 'TypeScript', 'Tailwind CSS']
),
(
    'eLibrary of Nintrea (Incoming)',
    'A website for searching and reading books online. It is a web application that allows users to search for books, read them online. It is designed to be user-friendly and easy to navigate, making it a great resource for anyone looking to read books online.',
    'elibrary.nintrea.top.png',
    true,
    ARRAY['NextJs', 'TypeScript', 'Tailwind CSS'],
    '[{"url": "https://github.com/nintrealab/elibrary", "name": "Live", "type": "source"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}]'::jsonb,
    ARRAY['NextJs', 'TypeScript', 'Tailwind CSS']
),
(
    'My Personal Blog',
    'A personal blog where I share my thoughts, experiences, and knowledge on various topics related to web development, design, and technology.',
    'blog-leatsophat.vercel.app.png',
    true,
    ARRAY['NextJs', 'JavaScript', 'Tailwind CSS'],
    '[{"url": "https://github.com/pphatdev/blog", "name": "Live", "type": "source"}, {"url": "https://blog-leatsophat.vercel.app", "name": "Live", "type": "demo"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}]'::jsonb,
    ARRAY['NextJs', 'JavaScript', 'Tailwind CSS']
),
(
    'Maskify Tool App',
    'Maskify Tool App is a personal utility for generating and applying custom masks to images. Easily initialize, edit, and manage image masks for your creative or practical projects.',
    'maskify.pphat.top.png',
    true,
    ARRAY['NextJs', 'TypeScript', 'Tailwind CSS'],
    '[{"url": "https://github.com/pphatlabs/maskify", "name": "Live", "type": "source"}, {"url": "https://maskify.pphat.top", "name": "Live", "type": "demo"}]'::jsonb,
    '[{"name": "Sophat LEAT", "profile": "https://github.com/pphatdev.png", "url": "https://pphat.top"}, {"name": "Sithuch CHHEM", "profile": "https://github.com/sithuch.png", "url": "https://sithuch.site"}]'::jsonb,
    ARRAY['NextJs', 'TypeScript', 'Tailwind CSS']
);