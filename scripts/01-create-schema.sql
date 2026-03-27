-- Step 4: Create tables for resume storage and all relational data

-- Contact Info Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resume Table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT,
  is_active BOOLEAN DEFAULT TRUE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill Categories (Languages, Frameworks, Cloud, Tools, AI/ML)
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills with Sub-skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  proficiency_level TEXT CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, name)
);

-- Sub-skills (e.g., Spring Security, REST APIs under Spring Boot)
CREATE TABLE IF NOT EXISTS skill_sub_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(skill_id, name)
);

-- Project Categories (Backend, Frontend, Full Stack, Open Source)
CREATE TABLE IF NOT EXISTS project_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects with Category Relationship
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES project_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  start_date TEXT,
  end_date TEXT,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Technologies
CREATE TABLE IF NOT EXISTS project_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology_name TEXT NOT NULL,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  cgpa DECIMAL(3,2),
  description TEXT,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  expiry_date TEXT,
  credential_url TEXT,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skill_sub_skills_skill ON skill_sub_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_project_technologies_project ON project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_resumes_is_active ON resumes(is_active);
