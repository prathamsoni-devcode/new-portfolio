-- Insert Pratham Soni's Portfolio Data

-- ==================== CONTACT INFORMATION ====================
INSERT INTO contact_info (email, phone, location, linkedin_url, github_url, portfolio_url)
VALUES (
  'pratham1108soni@gmail.com',
  '+91-9079843800',
  'Pune, India',
  'https://linkedin.com/in/pratham1108soni',
  'https://github.com/prathamsoni-devcode',
  'https://prathamsoni.vercel.app'
) ON CONFLICT (email) DO NOTHING;

-- ==================== SKILL CATEGORIES ====================
INSERT INTO skill_categories (name, description, display_order) VALUES
('Programming Languages', 'Core programming languages', 1),
('Frameworks & Libraries', 'Web and app frameworks', 2),
('Cloud & Platforms', 'Cloud platforms and services', 3),
('Tools & Technologies', 'Development tools and utilities', 4),
('AI & Machine Learning', 'AI, LLM, and ML technologies', 5)
ON CONFLICT (name) DO NOTHING;

-- Get category IDs for use in subsequent inserts
-- Note: We''ll use the category names in the subsequent inserts

-- ==================== SKILLS - PROGRAMMING LANGUAGES ====================
INSERT INTO skills (name, category_id, proficiency_level, display_order, is_featured) 
SELECT name, id, proficiency_level, display_order, is_featured FROM (
  VALUES
    ('Java', 'Programming Languages', 'Expert', 1, true),
    ('Kotlin', 'Programming Languages', 'Advanced', 2, false),
    ('Dart', 'Programming Languages', 'Advanced', 3, false),
    ('SQL', 'Programming Languages', 'Advanced', 4, false),
    ('TypeScript', 'Programming Languages', 'Advanced', 5, false)
) AS t(name, category_name, proficiency_level, display_order, is_featured)
JOIN skill_categories sc ON sc.name = t.category_name
ON CONFLICT (name) DO NOTHING;

-- ==================== SKILLS - FRAMEWORKS ====================
INSERT INTO skills (name, category_id, proficiency_level, display_order, is_featured)
SELECT name, id, proficiency_level, display_order, is_featured FROM (
  VALUES
    ('Spring Boot', 'Frameworks & Libraries', 'Expert', 1, true),
    ('Spring', 'Frameworks & Libraries', 'Expert', 2, true),
    ('Flutter', 'Frameworks & Libraries', 'Advanced', 3, true),
    ('Next.js', 'Frameworks & Libraries', 'Advanced', 4, true),
    ('LangChain', 'Frameworks & Libraries', 'Advanced', 5, false)
) AS t(name, category_name, proficiency_level, display_order, is_featured)
JOIN skill_categories sc ON sc.name = t.category_name
ON CONFLICT (name) DO NOTHING;

-- ==================== SKILLS - CLOUD & PLATFORMS ====================
INSERT INTO skills (name, category_id, proficiency_level, display_order, is_featured)
SELECT name, id, proficiency_level, display_order, is_featured FROM (
  VALUES
    ('AWS (EC2, RDS, S3, Lambda, Cognito)', 'Cloud & Platforms', 'Expert', 1, true),
    ('Google Cloud', 'Cloud & Platforms', 'Intermediate', 2, false),
    ('Firebase', 'Cloud & Platforms', 'Advanced', 3, false),
    ('Supabase', 'Cloud & Platforms', 'Advanced', 4, false),
    ('MongoDB Atlas', 'Cloud & Platforms', 'Advanced', 5, false),
    ('Pinecone', 'Cloud & Platforms', 'Advanced', 6, false)
) AS t(name, category_name, proficiency_level, display_order, is_featured)
JOIN skill_categories sc ON sc.name = t.category_name
ON CONFLICT (name) DO NOTHING;

-- ==================== SKILLS - TOOLS ====================
INSERT INTO skills (name, category_id, proficiency_level, display_order, is_featured)
SELECT name, id, proficiency_level, display_order, is_featured FROM (
  VALUES
    ('Git & GitHub', 'Tools & Technologies', 'Expert', 1, true),
    ('GitHub Actions', 'Tools & Technologies', 'Advanced', 2, false),
    ('Docker', 'Tools & Technologies', 'Advanced', 3, false),
    ('Kubernetes', 'Tools & Technologies', 'Intermediate', 4, false),
    ('Maven', 'Tools & Technologies', 'Advanced', 5, false),
    ('Gradle', 'Tools & Technologies', 'Intermediate', 6, false),
    ('Postman', 'Tools & Technologies', 'Advanced', 7, false),
    ('Swagger', 'Tools & Technologies', 'Advanced', 8, false),
    ('JUnit', 'Tools & Technologies', 'Advanced', 9, false),
    ('Jira', 'Tools & Technologies', 'Intermediate', 10, false)
) AS t(name, category_name, proficiency_level, display_order, is_featured)
JOIN skill_categories sc ON sc.name = t.category_name
ON CONFLICT (name) DO NOTHING;

-- ==================== SKILLS - AI & ML ====================
INSERT INTO skills (name, category_id, proficiency_level, display_order, is_featured)
SELECT name, id, proficiency_level, display_order, is_featured FROM (
  VALUES
    ('RAG (Retrieval-Augmented Generation)', 'AI & Machine Learning', 'Advanced', 1, true),
    ('Embeddings', 'AI & Machine Learning', 'Advanced', 2, true),
    ('Semantic Search', 'AI & Machine Learning', 'Advanced', 3, true),
    ('Vector Databases', 'AI & Machine Learning', 'Advanced', 4, true),
    ('LLM APIs', 'AI & Machine Learning', 'Advanced', 5, false)
) AS t(name, category_name, proficiency_level, display_order, is_featured)
JOIN skill_categories sc ON sc.name = t.category_name
ON CONFLICT (name) DO NOTHING;

-- ==================== SKILL SUB-SKILLS ====================
INSERT INTO skill_sub_skills (skill_id, name, description, display_order)
SELECT s.id, name, description, display_order FROM (
  VALUES
    ('Spring Boot', 'Spring Security', 'JWT, RBAC, authentication', 1),
    ('Spring Boot', 'Spring Data JPA', 'Database layer with Hibernate', 2),
    ('Spring Boot', 'REST APIs', 'Building RESTful services', 3),
    ('Spring Boot', 'Microservices', 'Modular layered architecture', 4),
    ('AWS (EC2, RDS, S3, Lambda, Cognito)', 'EC2', 'Virtual machine instances', 1),
    ('AWS (EC2, RDS, S3, Lambda, Cognito)', 'RDS', 'Relational database service', 2),
    ('AWS (EC2, RDS, S3, Lambda, Cognito)', 'S3', 'Object storage service', 3),
    ('AWS (EC2, RDS, S3, Lambda, Cognito)', 'Lambda', 'Serverless functions', 4),
    ('AWS (EC2, RDS, S3, Lambda, Cognito)', 'Cognito', 'Identity and access management', 5),
    ('Flutter', 'Flutter Web', 'Web application development', 1),
    ('Flutter', 'Mobile App', 'iOS and Android apps', 2),
    ('Flutter', 'State Management', 'Provider, Riverpod patterns', 3),
    ('Next.js', 'Server Components', 'RSC patterns', 1),
    ('Next.js', 'API Routes', 'Backend endpoints', 2),
    ('LangChain', 'RAG Pipelines', 'Retrieval-augmented generation', 1),
    ('PostgreSQL', 'PostGIS', 'Geospatial queries', 1)
) AS t(skill_name, name, description, display_order)
JOIN skills s ON s.name = t.skill_name
ON CONFLICT (skill_id, name) DO NOTHING;

-- ==================== PROJECT CATEGORIES ====================
INSERT INTO project_categories (name, description) VALUES
('Backend Development', 'Server-side and backend projects'),
('Full Stack', 'Full-stack web applications'),
('Mobile Development', 'Mobile and cross-platform apps'),
('Open Source', 'Open source contributions'),
('AI & LLM', 'AI and large language model projects')
ON CONFLICT (name) DO NOTHING;

-- ==================== PROJECTS ====================
INSERT INTO projects (title, description, long_description, category_id, github_url, start_date, end_date, is_featured, display_order)
SELECT title, description, long_description, pc.id, github_url, start_date, end_date, is_featured, display_order FROM (
  VALUES
    (
      'Uber Spring Boot App',
      'Ride-booking backend with Strategy Pattern',
      'Designed a ride-booking backend system implementing Strategy Design Pattern for dynamic driver allocation and fare calculation. Integrated PostGIS for proximity-based geospatial driver matching. Built layered architecture (Controller -> Service -> Strategy Manager -> Repository) with JWT + RBAC for drivers, riders, and admin roles. Implemented global exception handling and DTO validation.',
      'Backend Development',
      'https://github.com/prathamsoni11',
      '2025-11-01'::date,
      '2026-01-31'::date,
      true,
      1
    )
) AS t(title, description, long_description, category_name, github_url, start_date, end_date, is_featured, display_order)
JOIN project_categories pc ON pc.name = t.category_name
ON CONFLICT (title) DO NOTHING;

-- ==================== PROJECT TECHNOLOGIES ====================
INSERT INTO project_technologies (project_id, technology_name, display_order)
SELECT p.id, technology_name, display_order FROM (
  SELECT 'Uber Spring Boot App' as project_name, unnest(ARRAY[
    'Spring Boot', 'Spring Security', 'PostgreSQL', 'PostGIS', 'JWT', 'REST APIs', 
    'JPA/Hibernate', 'MVC Pattern', 'Docker', 'GitHub Actions'
  ]) WITH ORDINALITY AS t(technology_name, ord)
) AS tech(project_name, technology_name, display_order)
JOIN projects p ON p.title = tech.project_name
ON CONFLICT DO NOTHING;

-- ==================== EXPERIENCES ====================
INSERT INTO experiences (job_title, company_name, company_url, description, start_date, end_date, is_current, display_order) VALUES
(
  'Software Engineer',
  'ConsultAdd',
  'https://consultadd.com',
  'Built and scaled LangChain-powered RAG pipelines to process 1,000+ overlapping transcript chunks per document, cutting manual review time by ~60%. Hardened API access using Spring Security, JWT, and RBAC across 15+ endpoints. Owned AWS infrastructure (EC2, RDS, S3) for production backend services, maintaining 99.9% uptime. Architected modular Spring Boot microservices with layered pattern. Standardised service deployment via Docker containers.',
  '2024-02-01'::date,
  NULL,
  true,
  1
),
(
  'Flutter Developer (Internships & Open Source)',
  'Freelance & Open Source',
  'https://github.com/prathamsoni-devcode',
  'Shipped cross-platform Flutter apps to Android, iOS, and Web for 4 clients. Wired Firebase Auth, Firestore, Cloud Functions, Razorpay SDK, and Google AdMob into client apps. Architected state management layers using Provider and Riverpod. Contributed to Open Food Facts open-source project.',
  '2022-02-01'::date,
  '2023-05-31'::date,
  false,
  2
)
ON CONFLICT DO NOTHING;

-- ==================== EXPERIENCE RESPONSIBILITIES ====================
INSERT INTO experience_responsibilities (experience_id, responsibility, display_order)
SELECT e.id, responsibility, display_order FROM (
  SELECT 'Software Engineer' as job_title, 'ConsultAdd' as company_name, 
    unnest(ARRAY[
      'Built and scaled LangChain-powered RAG pipelines to process 1,000+ transcript chunks per document, cutting manual review time by ~60%',
      'Hardened API access using Spring Security, JWT, and RBAC across 15+ endpoints for multi-tenant ABM platform',
      'Owned AWS infrastructure (EC2, RDS, S3) for production backend, maintaining 99.9% uptime and reducing query response time by ~35%',
      'Architected modular Spring Boot microservices with layered pattern enforcement (Controller -> Service -> Repository)',
      'Standardised service deployment via Docker containers, eliminating environment drift',
      'Maintained Swagger/OpenAPI documentation used by frontend teams'
    ]) WITH ORDINALITY AS t(responsibility, ord)
) AS resp(job_title, company_name, responsibility, display_order)
JOIN experiences e ON e.job_title = resp.job_title AND e.company_name = resp.company_name
ON CONFLICT DO NOTHING;

-- ==================== EDUCATION ====================
INSERT INTO education (institution_name, degree_name, field_of_study, start_date, end_date, cgpa, display_order) VALUES
(
  'Arya College of Engineering',
  'Bachelor of Technology',
  'Computer Science',
  '2020-05-01'::date,
  '2024-05-31'::date,
  8.3,
  1
)
ON CONFLICT DO NOTHING;

-- ==================== CERTIFICATIONS ====================
INSERT INTO certifications (certification_name, issuing_organization, issue_date, description, display_order) VALUES
(
  'AWS Solutions Architect Associate',
  'Amazon Web Services',
  '2024-01-01'::date,
  'AWS certified professional architect with expertise in designing scalable, reliable, and secure cloud solutions',
  1
)
ON CONFLICT DO NOTHING;
