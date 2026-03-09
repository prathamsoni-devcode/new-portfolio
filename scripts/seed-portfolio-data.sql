-- Seed Projects Table
INSERT INTO projects (title, description, technologies, image_url, github_url, live_url, created_at) VALUES
(
  'Uber Spring Boot App',
  'Designed a ride-booking backend system implementing strategy patterns for driver allocation and fare calculation. Developed layered architecture with JWT authentication and PostGIS for geospatial queries.',
  ARRAY['Spring Boot', 'Postgres', 'PostGIS', 'JWT', 'REST APIs'],
  '/placeholder.svg',
  'https://github.com/prathamsoni11',
  '',
  NOW()
),
(
  'LLM-driven Transcript Analysis Platform',
  'Designed and developed Spring Boot backend services to integrate LLM-based transcript analysis. Implemented automated transcript processing pipeline with intelligent chunking and Pinecone vector DB storage.',
  ARRAY['Spring Boot', 'LangChain', 'OpenRouter', 'Pinecone', 'AWS', 'Docker', 'JWT'],
  '/placeholder.svg',
  'https://github.com/prathamsoni11',
  '',
  NOW()
);

-- Seed Experiences Table
INSERT INTO experiences (title, company, period, technologies, description, display_order, created_at) VALUES
(
  'Software Engineer',
  'Consultadd',
  'Feb 2024 - Present',
  ARRAY['Spring Boot', 'LangChain', 'OpenRouter', 'Pinecone', 'AWS', 'Docker', 'JWT'],
  'Designing and developing Spring Boot backend services with LLM integration using LangChain and OpenRouter APIs.',
  1,
  NOW()
),
(
  'Flutter Developer',
  'Multiple Client Engagements',
  'Feb 2022 - May 2023',
  ARRAY['Flutter', 'Dart', 'Firebase', 'Razorpay', 'REST APIs'],
  'Developed cross-platform mobile applications using Flutter with Firebase backend and payment integration.',
  2,
  NOW()
);

-- Seed Skills Table
INSERT INTO skills (category, skill_name, proficiency_level, display_order, created_at) VALUES
('Languages', 'Java', 'Expert', 1, NOW()),
('Languages', 'Dart', 'Advanced', 2, NOW()),
('Languages', 'Kotlin', 'Intermediate', 3, NOW()),
('Languages', 'SQL', 'Advanced', 4, NOW()),
('Frameworks', 'Flutter', 'Advanced', 5, NOW()),
('Frameworks', 'Spring Boot', 'Expert', 6, NOW()),
('Platforms', 'AWS', 'Advanced', 7, NOW()),
('Platforms', 'RDS', 'Advanced', 8, NOW()),
('Platforms', 'AWS Lambda', 'Intermediate', 9, NOW()),
('Platforms', 'AWS S3', 'Intermediate', 10, NOW()),
('Tools', 'Git', 'Advanced', 11, NOW()),
('Tools', 'GitHub', 'Advanced', 12, NOW()),
('Tools', 'Docker', 'Advanced', 13, NOW()),
('Tools', 'Maven', 'Advanced', 14, NOW()),
('Tools', 'Gradle', 'Intermediate', 15, NOW()),
('Tools', 'Swagger', 'Intermediate', 16, NOW()),
('AI', 'LangChain', 'Advanced', 17, NOW()),
('AI', 'LLM APIs', 'Advanced', 18, NOW()),
('AI', 'Pinecone', 'Intermediate', 19, NOW()),
('AI', 'RAG Pipelines', 'Advanced', 20, NOW());
