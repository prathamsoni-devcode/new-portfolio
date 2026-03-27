-- Step 5: Insert Pratham Soni's data from resume

-- Insert Contact Info
INSERT INTO contact_info (email, phone, location, linkedin_url, github_url, twitter_url, portfolio_url)
VALUES (
  'pratham1108soni@gmail.com',
  '+91-9079843800',
  'Pune, India',
  'https://www.linkedin.com/in/pratham1108soni',
  'https://github.com/prathamsoni-devcode',
  'https://twitter.com',
  'https://prathamsoni.vercel.app'
);

-- Insert Skill Categories
INSERT INTO skill_categories (name, description, display_order) VALUES
('Languages', 'Programming Languages', 1),
('Frameworks & Libraries', 'Backend and Frontend Frameworks', 2),
('Cloud & Databases', 'Cloud Platforms and Database Technologies', 3),
('Tools & Technologies', 'Development Tools and Platforms', 4),
('AI & Machine Learning', 'AI/ML Libraries and Concepts', 5);

-- Insert Skills with Sub-skills
-- Languages Category
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Java', 'Expert', TRUE, 1 FROM skill_categories WHERE name = 'Languages'
RETURNING id INTO TEMP java_id;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Object-Oriented Programming', 'OOP concepts and design patterns', 1
FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Languages');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Collections Framework', 'Java Collections API', 2
FROM skills WHERE name = 'Java' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Languages');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Kotlin', 'Advanced', TRUE, 2 FROM skill_categories WHERE name = 'Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Dart', 'Advanced', FALSE, 3 FROM skill_categories WHERE name = 'Languages';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'SQL', 'Expert', TRUE, 4 FROM skill_categories WHERE name = 'Languages';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Query Optimization', 'Indexing and query performance', 1
FROM skills WHERE name = 'SQL' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Languages');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'TypeScript', 'Advanced', TRUE, 5 FROM skill_categories WHERE name = 'Languages';

-- Frameworks & Libraries Category
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Spring Boot', 'Expert', TRUE, 1 FROM skill_categories WHERE name = 'Frameworks & Libraries'
RETURNING id INTO TEMP springboot_id;

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Spring Security', 'Authentication and authorization', 1
FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'REST APIs', 'RESTful web services', 2
FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Microservices', 'Microservices architecture', 3
FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Spring Data JPA', 'ORM and database persistence', 4
FROM skills WHERE name = 'Spring Boot' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Flutter', 'Advanced', TRUE, 2 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Flutter Web', 'Web applications with Flutter', 1
FROM skills WHERE name = 'Flutter' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Mobile App Development', 'iOS and Android apps', 2
FROM skills WHERE name = 'Flutter' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Next.js', 'Advanced', TRUE, 3 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Server Components', 'React Server Components', 1
FROM skills WHERE name = 'Next.js' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'API Routes', 'Backend routing with Next.js', 2
FROM skills WHERE name = 'Next.js' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Frameworks & Libraries');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'React', 'Advanced', TRUE, 4 FROM skill_categories WHERE name = 'Frameworks & Libraries';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'LangChain', 'Intermediate', FALSE, 5 FROM skill_categories WHERE name = 'Frameworks & Libraries';

-- Cloud & Databases Category
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'PostgreSQL', 'Expert', TRUE, 1 FROM skill_categories WHERE name = 'Cloud & Databases';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'PostGIS', 'Geospatial extension for PostgreSQL', 1
FROM skills WHERE name = 'PostgreSQL' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Cloud & Databases');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Supabase', 'Advanced', TRUE, 2 FROM skill_categories WHERE name = 'Cloud & Databases';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Firebase', 'Advanced', TRUE, 3 FROM skill_categories WHERE name = 'Cloud & Databases';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'AWS', 'Advanced', TRUE, 4 FROM skill_categories WHERE name = 'Cloud & Databases';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'EC2', 'Elastic Compute Cloud', 1
FROM skills WHERE name = 'AWS' AND category_id = (SELECT id FROM skill_categories WHERE name = 'Cloud & Databases');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Google Cloud', 'Intermediate', FALSE, 5 FROM skill_categories WHERE name = 'Cloud & Databases';

-- Tools & Technologies Category
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Git & GitHub', 'Expert', TRUE, 1 FROM skill_categories WHERE name = 'Tools & Technologies';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Docker', 'Advanced', TRUE, 2 FROM skill_categories WHERE name = 'Tools & Technologies';

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'Linux', 'Advanced', TRUE, 3 FROM skill_categories WHERE name = 'Tools & Technologies';

-- AI & Machine Learning Category
INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'RAG (Retrieval Augmented Generation)', 'Intermediate', FALSE, 1 FROM skill_categories WHERE name = 'AI & Machine Learning';

INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT id, 'Vector Embeddings', 'Text embeddings for RAG', 1
FROM skills WHERE name = 'RAG (Retrieval Augmented Generation)' AND category_id = (SELECT id FROM skill_categories WHERE name = 'AI & Machine Learning');

INSERT INTO skills (category_id, name, proficiency_level, is_featured, display_order)
SELECT id, 'LLM APIs', 'Large Language Model APIs', 'Intermediate', FALSE, 2 FROM skill_categories WHERE name = 'AI & Machine Learning';

-- Insert Project Categories
INSERT INTO project_categories (name, description) VALUES
('Backend Development', 'Server-side and backend projects'),
('Frontend Development', 'Client-side and frontend projects'),
('Full Stack', 'Complete full-stack applications'),
('Open Source', 'Open source contributions');

-- Insert Projects
INSERT INTO projects (category_id, title, description, long_description, github_url, is_featured, display_order)
SELECT 
  pc.id,
  'Uber Spring Boot App',
  'A ride-booking backend system implementing strategy patterns for driver allocation and fare calculation.',
  'Designed a comprehensive ride-booking backend system implementing strategy patterns for driver allocation and fare calculation. Features geospatial queries with PostGIS for proximity-based driver matching and JWT-based authentication with Spring Security.',
  'https://github.com/prathamsoni-devcode',
  TRUE,
  1
FROM project_categories pc WHERE pc.name = 'Backend Development';

-- Insert Project Technologies for Uber project
INSERT INTO project_technologies (project_id, technology_name, display_order)
SELECT p.id, 'Spring Boot', 1 FROM projects p WHERE p.title = 'Uber Spring Boot App';

INSERT INTO project_technologies (project_id, technology_name, display_order)
SELECT p.id, 'Spring Security', 2 FROM projects p WHERE p.title = 'Uber Spring Boot App';

INSERT INTO project_technologies (project_id, technology_name, display_order)
SELECT p.id, 'PostgreSQL', 3 FROM projects p WHERE p.title = 'Uber Spring Boot App';

INSERT INTO project_technologies (project_id, technology_name, display_order)
SELECT p.id, 'PostGIS', 4 FROM projects p WHERE p.title = 'Uber Spring Boot App';

INSERT INTO project_technologies (project_id, technology_name, display_order)
SELECT p.id, 'JWT', 5 FROM projects p WHERE p.title = 'Uber Spring Boot App';

-- Insert Education
INSERT INTO education (school_name, degree, field_of_study, start_date, end_date, cgpa, description, display_order)
VALUES (
  'Arya College of Engineering',
  'B.Tech',
  'Computer Science and Engineering',
  '2020',
  '2024',
  8.3,
  'Graduated with CGPA 8.3 in Computer Science and Engineering',
  1
);

-- Insert Certifications
INSERT INTO certifications (name, issuer, issue_date, credential_url, display_order)
VALUES (
  'AWS Solutions Architect Associate',
  'Amazon Web Services',
  '2024',
  'https://aws.amazon.com',
  1
);
