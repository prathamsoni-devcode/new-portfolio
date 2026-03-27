-- Drop existing tables to recreate with proper structure
DROP TABLE IF EXISTS project_technologies CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skill_sub_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS skill_categories CASCADE;
DROP TABLE IF EXISTS experience_responsibilities CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;

-- 1. Contact Info Table
CREATE TABLE contact_info (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(255),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  portfolio_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Resumes Table
CREATE TABLE resumes (
  id BIGSERIAL PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  storage_path VARCHAR(255) NOT NULL,
  file_size INTEGER,
  download_url TEXT,
  is_active BOOLEAN DEFAULT true,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skill Categories Table
CREATE TABLE skill_categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Skills Table (with category relationship)
CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  proficiency_level VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category_id, name)
);

-- 5. Skill Sub-Skills Table (frameworks, tools under skills)
CREATE TABLE skill_sub_skills (
  id BIGSERIAL PRIMARY KEY,
  skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(skill_id, name)
);

-- 6. Project Categories Table
CREATE TABLE project_categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Projects Table (with category relationship)
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES project_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  image_url VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  start_date DATE,
  end_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Project Technologies Table (junction table for projects and skills)
CREATE TABLE project_technologies (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, skill_id)
);

-- 9. Experiences Table
CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  company_url VARCHAR(255),
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Experience Responsibilities Table
CREATE TABLE experience_responsibilities (
  id BIGSERIAL PRIMARY KEY,
  experience_id BIGINT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  responsibility TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_skills_category_id ON skills(category_id);
CREATE INDEX idx_skill_sub_skills_skill_id ON skill_sub_skills(skill_id);
CREATE INDEX idx_projects_category_id ON projects(category_id);
CREATE INDEX idx_project_technologies_project_id ON project_technologies(project_id);
CREATE INDEX idx_project_technologies_skill_id ON project_technologies(skill_id);
CREATE INDEX idx_experience_responsibilities_experience_id ON experience_responsibilities(experience_id);
CREATE INDEX idx_resumes_is_active ON resumes(is_active);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_sub_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_responsibilities ENABLE ROW LEVEL SECURITY;

-- Public read-only policies for all tables
CREATE POLICY "Allow public read" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON resumes FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON skill_sub_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON project_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experience_responsibilities FOR SELECT USING (true);
