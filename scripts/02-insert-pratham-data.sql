-- Insert Contact Information
INSERT INTO contact_info (email, phone, location, github_url, linkedin_url, portfolio_url)
VALUES (
  'pratham1108soni@gmail.com',
  '+91-9079843800',
  'Pune, India',
  'https://github.com/prathamsoni-devcode',
  'https://linkedin.com/in/pratham1108soni',
  'https://prathamsoni.vercel.app'
);

-- Insert Skill Categories
INSERT INTO skill_categories (name, description, display_order)
VALUES 
  ('Programming Languages', 'Core programming languages', 1),
  ('Frameworks & Libraries', 'Web and mobile frameworks', 2),
  ('Cloud & Deployment', 'Cloud platforms and DevOps', 3),
  ('Databases', 'Database systems and tools', 4),
  ('AI & ML', 'Artificial Intelligence and Machine Learning', 5);

-- Programming Languages
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Java', 'Expert', true, 1 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Spring Boot', 'Spring Boot backend development', 1 
FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Programming Languages');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Spring Security', 'Authentication and authorization', 2 
FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Programming Languages');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Microservices', 'Microservices architecture', 3 
FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Programming Languages');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Kotlin', 'Advanced', false, 2 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Dart', 'Advanced', false, 3 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'TypeScript', 'Expert', true, 4 FROM skill_categories WHERE name = 'Programming Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'SQL', 'Advanced', false, 5 FROM skill_categories WHERE name = 'Programming Languages';

-- Frameworks & Libraries
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Spring Boot', 'Expert', true, 1 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'REST APIs', 'RESTful API design and implementation', 1 
FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'JPA/Hibernate', 'ORM and database mapping', 2 
FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Flutter', 'Advanced', true, 2 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Mobile App Development', 'Cross-platform mobile development', 1 
FROM skills WHERE name = 'Flutter' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Flutter Web', 'Web applications with Flutter', 2 
FROM skills WHERE name = 'Flutter' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Next.js', 'Expert', true, 3 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Server Components', 'React Server Components and SSR', 1 
FROM skills WHERE name = 'Next.js' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'API Routes', 'Backend API development in Next.js', 2 
FROM skills WHERE name = 'Next.js' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'React', 'Expert', true, 4 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'LangChain', 'Advanced', false, 5 FROM skill_categories WHERE name = 'Frameworks & Libraries';

-- Cloud & Deployment
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'AWS', 'Advanced', true, 1 FROM skill_categories WHERE name = 'Cloud & Deployment';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'EC2', 'Elastic Compute Cloud', 1 
FROM skills WHERE name = 'AWS' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Cloud & Deployment');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'RDS', 'Relational Database Service', 2 
FROM skills WHERE name = 'AWS' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Cloud & Deployment');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Google Cloud', 'Advanced', false, 2 FROM skill_categories WHERE name = 'Cloud & Deployment';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Firebase', 'Advanced', true, 3 FROM skill_categories WHERE name = 'Cloud & Deployment';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Supabase', 'Advanced', true, 4 FROM skill_categories WHERE name = 'Cloud & Deployment';

-- Databases
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'PostgreSQL', 'Advanced', true, 1 FROM skill_categories WHERE name = 'Databases';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'PostGIS', 'Geospatial extensions', 1 
FROM skills WHERE name = 'PostgreSQL' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Databases');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'MongoDB', 'Advanced', false, 2 FROM skill_categories WHERE name = 'Databases';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Firebase Firestore', 'Advanced', false, 3 FROM skill_categories WHERE name = 'Databases';

-- AI & ML
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'RAG Systems', 'Advanced', true, 1 FROM skill_categories WHERE name = 'AI & ML';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Vector Embeddings', 'Creating and using vector embeddings', 1 
FROM skills WHERE name = 'RAG Systems' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & ML');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Vector Databases', 'Pinecone, Weaviate, Chroma', 2 
FROM skills WHERE name = 'RAG Systems' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & ML');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'LLM Integration', 'Working with OpenAI, Anthropic, Google APIs', 'Advanced', true, 2 FROM skill_categories WHERE name = 'AI & ML';

-- Project Categories
INSERT INTO project_categories (name, description, display_order)
VALUES 
  ('Backend Development', 'Server-side and backend projects', 1),
  ('Frontend Development', 'Client-side and UI projects', 2),
  ('Full Stack', 'Complete end-to-end projects', 3);

-- Projects
INSERT INTO projects (category_id, title, description, long_description, github_url, is_featured, start_date, end_date, display_order)
SELECT 
  id,
  'Uber Spring Boot Backend',
  'Ride-booking system with geospatial queries',
  'Designed and implemented a ride-booking backend system using Spring Boot with Strategy Pattern for driver allocation and fare calculation. Features geospatial queries using PostGIS for proximity-based driver matching. Includes JWT-based authentication and comprehensive REST API endpoints.',
  'https://github.com/prathamsoni-devcode/uber-backend',
  true,
  '2023-06-01',
  '2023-12-31',
  1
FROM project_categories WHERE name = 'Backend Development';

-- Project Technologies
INSERT INTO project_technologies (project_id, skill_id)
SELECT p.id, s.id FROM projects p, skills s 
WHERE p.title = 'Uber Spring Boot Backend' 
AND s.name IN ('Java', 'Spring Boot', 'PostgreSQL')
LIMIT 3;

-- Experiences
INSERT INTO experiences (job_title, company_name, company_url, description, start_date, is_current, display_order)
VALUES (
  'Software Engineer',
  'ConsultAdd',
  'https://consultadd.com',
  'Building AI-powered solutions and full-stack applications',
  '2024-02-01',
  true,
  1
);

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Developed LLM-powered RAG systems with vector embeddings', 1 FROM experiences WHERE job_title = 'Software Engineer';

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Built full-stack web applications with Next.js and Spring Boot', 2 FROM experiences WHERE job_title = 'Software Engineer';

INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT id, 'Designed and optimized database schemas for scalability', 3 FROM experiences WHERE job_title = 'Software Engineer';
