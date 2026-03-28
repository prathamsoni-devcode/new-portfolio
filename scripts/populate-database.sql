-- Clear existing data (if any) and populate with Pratham's resume data

-- Insert Contact Information
DELETE FROM contact_info;
INSERT INTO contact_info (email, phone, location, github_url, linkedin_url, twitter_url, portfolio_url)
VALUES (
  'pratham1108soni@gmail.com',
  '+91-9079843800',
  'Pune, India',
  'https://github.com/prathamsoni-devcode',
  'https://linkedin.com/in/pratham1108soni',
  'https://twitter.com/prathamsoni',
  'https://prathamsoni.vercel.app'
);

-- Insert Project Categories
DELETE FROM project_categories;
INSERT INTO project_categories (name, description, display_order)
VALUES 
  ('Backend Development', 'Server-side and API development', 1),
  ('Frontend Development', 'User interface and client-side apps', 2),
  ('Full Stack', 'Complete end-to-end applications', 3);

-- Insert Projects
DELETE FROM projects;
INSERT INTO projects (category_id, title, description, long_description, github_url, is_featured, start_date, end_date, display_order)
SELECT 
  id,
  'Uber Spring Boot Backend',
  'Ride-booking system with geospatial queries and driver matching',
  'Designed and implemented a comprehensive ride-booking backend system using Spring Boot implementing strategy patterns for driver allocation and fare calculation. Features geospatial queries using PostGIS for proximity-based driver matching. Includes JWT-based authentication with Spring Security and comprehensive REST API endpoints for managing rides, drivers, and payments.',
  'https://github.com/prathamsoni-devcode',
  true,
  '2023-06-01'::date,
  '2023-12-31'::date,
  1
FROM project_categories WHERE name = 'Backend Development';

-- Insert Skill Categories
DELETE FROM skill_categories;
INSERT INTO skill_categories (name, description, display_order)
VALUES 
  ('Programming Languages', 'Core programming languages and paradigms', 1),
  ('Frameworks & Libraries', 'Web and mobile frameworks', 2),
  ('Cloud & DevOps', 'Cloud platforms and deployment tools', 3),
  ('Databases & Storage', 'Database systems and data management', 4),
  ('AI & Machine Learning', 'Artificial Intelligence and Machine Learning', 5);

-- Insert Skills with Sub-skills

-- Java (Programming Languages)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Java', 'Expert', true, 1 FROM skill_categories WHERE name = 'Programming Languages'
RETURNING id AS skill_id INTO TEMP java_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT skill_id FROM (SELECT id as skill_id FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Programming Languages') LIMIT 1) AS s),
  'Object-Oriented Programming',
  'OOP concepts, design patterns, and SOLID principles',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Programming Languages') LIMIT 1),
  'Multithreading',
  'Concurrent programming and thread management',
  2;

-- TypeScript (Programming Languages)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'TypeScript', 'Expert', true, 2 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Kotlin', 'Advanced', false, 3 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Dart', 'Advanced', false, 4 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'SQL', 'Advanced', true, 5 FROM skill_categories WHERE name = 'Programming Languages';

-- Spring Boot (Frameworks & Libraries)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Spring Boot', 'Expert', true, 1 FROM skill_categories WHERE name = 'Frameworks & Libraries'
RETURNING id INTO TEMP springboot_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'Spring Security',
  'Authentication, authorization, and security management',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'REST APIs',
  'Building RESTful web services and microservices',
  2;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'JPA/Hibernate',
  'Object-relational mapping and database persistence',
  3;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'Microservices',
  'Building and deploying microservice architectures',
  4;

-- Next.js (Frameworks & Libraries)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Next.js', 'Expert', true, 2 FROM skill_categories WHERE name = 'Frameworks & Libraries'
RETURNING id INTO TEMP nextjs_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Next.js' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'Server Components',
  'React Server Components and Server-Side Rendering',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Next.js' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'API Routes',
  'Backend API development within Next.js',
  2;

-- React (Frameworks & Libraries)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'React', 'Expert', true, 3 FROM skill_categories WHERE name = 'Frameworks & Libraries';

-- Flutter (Frameworks & Libraries)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Flutter', 'Advanced', true, 4 FROM skill_categories WHERE name = 'Frameworks & Libraries'
RETURNING id INTO TEMP flutter_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Flutter' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'Cross-Platform Development',
  'Building iOS, Android, and Web apps',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'Flutter' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries') LIMIT 1),
  'State Management',
  'Provider, Riverpod, and GetX patterns',
  2;

-- LangChain (Frameworks & Libraries)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'LangChain', 'Intermediate', false, 5 FROM skill_categories WHERE name = 'Frameworks & Libraries';

-- AWS (Cloud & DevOps)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'AWS', 'Advanced', true, 1 FROM skill_categories WHERE name = 'Cloud & DevOps'
RETURNING id INTO TEMP aws_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'AWS' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Cloud & DevOps') LIMIT 1),
  'EC2',
  'Elastic Compute Cloud instances and management',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'AWS' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Cloud & DevOps') LIMIT 1),
  'RDS',
  'Relational Database Service',
  2;

-- Google Cloud (Cloud & DevOps)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Google Cloud', 'Intermediate', false, 2 FROM skill_categories WHERE name = 'Cloud & DevOps';

-- Firebase (Cloud & DevOps)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Firebase', 'Advanced', true, 3 FROM skill_categories WHERE name = 'Cloud & DevOps';

-- Supabase (Cloud & DevOps)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Supabase', 'Advanced', true, 4 FROM skill_categories WHERE name = 'Cloud & DevOps';

-- PostgreSQL (Databases & Storage)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'PostgreSQL', 'Advanced', true, 1 FROM skill_categories WHERE name = 'Databases & Storage'
RETURNING id INTO TEMP postgres_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'PostgreSQL' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Databases & Storage') LIMIT 1),
  'PostGIS',
  'Geospatial extension for location-based queries',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'PostgreSQL' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Databases & Storage') LIMIT 1),
  'Query Optimization',
  'Indexing, query performance tuning, and execution plans',
  2;

-- MongoDB (Databases & Storage)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'MongoDB', 'Intermediate', false, 2 FROM skill_categories WHERE name = 'Databases & Storage';

-- Firebase Firestore (Databases & Storage)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Firebase Firestore', 'Advanced', false, 3 FROM skill_categories WHERE name = 'Databases & Storage';

-- RAG Systems (AI & Machine Learning)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'RAG Systems', 'Advanced', true, 1 FROM skill_categories WHERE name = 'AI & Machine Learning'
RETURNING id INTO TEMP rag_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'RAG Systems' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & Machine Learning') LIMIT 1),
  'Vector Embeddings',
  'Creating and managing text embeddings for semantic search',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'RAG Systems' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & Machine Learning') LIMIT 1),
  'Vector Databases',
  'Pinecone, Weaviate, Chroma, and vector storage',
  2;

-- LLM Integration (AI & Machine Learning)
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'LLM Integration', 'Advanced', true, 2 FROM skill_categories WHERE name = 'AI & Machine Learning'
RETURNING id INTO TEMP llm_skill;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'LLM Integration' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & Machine Learning') LIMIT 1),
  'OpenAI API',
  'Integrating OpenAI GPT models',
  1;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT 
  (SELECT id FROM skills WHERE name = 'LLM Integration' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & Machine Learning') LIMIT 1),
  'Anthropic Claude',
  'Working with Claude API',
  2;

-- Insert Experiences
DELETE FROM experiences;
INSERT INTO experiences (job_title, company_name, company_url, description, start_date, is_current, display_order)
VALUES (
  'Software Engineer',
  'ConsultAdd',
  'https://consultadd.com',
  'Building AI-powered solutions and full-stack applications with focus on backend development and cloud infrastructure',
  '2024-02-01'::date,
  true,
  1
);

-- Insert Experience Responsibilities
DELETE FROM experience_responsibilities;
INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Developed LLM-powered RAG systems with vector embeddings and semantic search capabilities', 1 FROM experiences WHERE job_title = 'Software Engineer';

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Built full-stack web applications using Next.js, React, and Spring Boot', 2 FROM experiences WHERE job_title = 'Software Engineer';

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Designed and optimized database schemas for scalability and performance', 3 FROM experiences WHERE job_title = 'Software Engineer';

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Implemented microservices architecture with Spring Boot and AWS infrastructure', 4 FROM experiences WHERE job_title = 'Software Engineer';

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Led API design and REST endpoint development with JWT authentication', 5 FROM experiences WHERE job_title = 'Software Engineer';
