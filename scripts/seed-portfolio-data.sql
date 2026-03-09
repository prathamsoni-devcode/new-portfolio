-- Seed Projects Table
INSERT INTO projects (title, description, technologies, image_url, github_url, live_url, created_at) VALUES
(
  'Uber Spring Boot App',
  'Designed a ride-booking backend system implementing strategy patterns for driver allocation and fare calculation. Developed layered architecture with JWT authentication and PostGIS for geospatial queries.',
  '["Spring Boot", "Postgres", "PostGIS", "JWT", "REST APIs"]',
  '/placeholder.svg',
  'https://github.com/prathamsoni11',
  '',
  NOW()
),
(
  'LLM-driven Transcript Analysis Platform',
  'Designed and developed Spring Boot backend services to integrate LLM-based transcript analysis. Implemented automated transcript processing pipeline with intelligent chunking and Pinecone vector DB storage.',
  '["Spring Boot", "LangChain", "OpenRouter", "Pinecone", "AWS", "Docker", "JWT"]',
  '/placeholder.svg',
  'https://github.com/prathamsoni11',
  '',
  NOW()
)
ON CONFLICT (title) DO NOTHING;

-- Seed Experiences Table
INSERT INTO experiences (title, company, period, technologies, start_date, end_date, created_at) VALUES
(
  'Software Engineer',
  'Consultadd',
  'Feb 2024 - Present',
  '["Spring Boot", "LangChain", "OpenRouter", "Pinecone", "AWS", "Docker", "JWT"]',
  '2024-02-01',
  NULL,
  NOW()
),
(
  'Flutter Developer',
  'Multiple Client Engagements',
  'Feb 2022 - May 2023',
  '["Flutter", "Dart", "Firebase", "Razorpay", "REST APIs"]',
  '2022-02-01',
  '2023-05-31',
  NOW()
)
ON CONFLICT (company, title) DO NOTHING;

-- Seed Skills Table
INSERT INTO skills (category, skill_name, proficiency, created_at) VALUES
('Languages', 'Java', 'Expert', NOW()),
('Languages', 'Dart', 'Advanced', NOW()),
('Languages', 'Kotlin', 'Intermediate', NOW()),
('Languages', 'SQL', 'Advanced', NOW()),
('Frameworks', 'Flutter', 'Advanced', NOW()),
('Frameworks', 'Spring Boot', 'Expert', NOW()),
('Platforms', 'AWS', 'Advanced', NOW()),
('Platforms', 'RDS', 'Advanced', NOW()),
('Platforms', 'AWS Lambda', 'Intermediate', NOW()),
('Platforms', 'AWS S3', 'Intermediate', NOW()),
('Tools', 'Git', 'Advanced', NOW()),
('Tools', 'GitHub', 'Advanced', NOW()),
('Tools', 'Docker', 'Advanced', NOW()),
('Tools', 'Maven', 'Advanced', NOW()),
('Tools', 'Gradle', 'Intermediate', NOW()),
('Tools', 'Swagger', 'Intermediate', NOW()),
('AI', 'LangChain', 'Advanced', NOW()),
('AI', 'LLM APIs', 'Advanced', NOW()),
('AI', 'Pinecone', 'Intermediate', NOW()),
('AI', 'RAG Pipelines', 'Advanced', NOW())
ON CONFLICT (category, skill_name) DO NOTHING;
