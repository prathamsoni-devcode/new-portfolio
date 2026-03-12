-- ========================================
-- RELATIONAL DATABASE SCHEMA WITH USERS AND ROLES
-- ========================================

-- 1. CREATE USERS TABLE (tied to auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  profile_picture_url VARCHAR(500),
  resume_url VARCHAR(500),
  bio TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ENHANCE PROJECTS TABLE WITH RELATIONS
ALTER TABLE projects ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- 3. ENHANCE EXPERIENCES TABLE WITH RELATIONS
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES users(id) ON DELETE SET NULL;

-- 4. ENHANCE SKILLS TABLE WITH RELATIONS
ALTER TABLE skills ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS category_id UUID;

-- 5. CREATE SKILL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ADD FK TO SKILL_CATEGORIES IN SKILLS
ALTER TABLE skills ADD CONSTRAINT fk_skill_category 
  FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE SET NULL;

-- 7. CREATE PROJECT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS project_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. UPDATE PROJECTS WITH CATEGORY FK
ALTER TABLE projects ADD CONSTRAINT fk_project_category 
  FOREIGN KEY (category) REFERENCES project_categories(id) ON DELETE SET NULL;

-- 9. CREATE ACTIVITY LOG TABLE FOR AUDIT
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  changes JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. ENHANCE CONTACT MESSAGES WITH RELATIONS
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS response TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high'));

-- ========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_experiences_created_by ON experiences(created_by);
CREATE INDEX IF NOT EXISTS idx_skills_created_by ON skills(created_by);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_assigned_to ON contact_messages(assigned_to);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ========================================
-- CREATE RLS POLICIES FOR USERS TABLE
-- ========================================
-- Allow users to read their own profile
CREATE POLICY "Allow users to read own profile" ON users 
  FOR SELECT USING (auth.uid() = id);

-- Allow admins to read all profiles
CREATE POLICY "Allow admins to read all profiles" ON users 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Allow users to update their own profile
CREATE POLICY "Allow users to update own profile" ON users 
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to update all profiles
CREATE POLICY "Allow admins to update all profiles" ON users 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ========================================
-- UPDATE EXISTING RLS POLICIES
-- ========================================
-- Drop old policies and create new ones with proper authorization

-- Drop old project policies
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;

-- Create new project policies
CREATE POLICY "Allow public read on projects" ON projects 
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create projects" ON projects 
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "Allow editors to update their projects" ON projects 
  FOR UPDATE USING (
    created_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Drop old experience policies
DROP POLICY IF EXISTS "Allow public read on experiences" ON experiences;

CREATE POLICY "Allow public read on experiences" ON experiences 
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create experiences" ON experiences 
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Drop old skills policies
DROP POLICY IF EXISTS "Allow public read on skills" ON skills;

CREATE POLICY "Allow public read on skills" ON skills 
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create skills" ON skills 
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Drop old contact messages policies
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public read on contact_messages" ON contact_messages;

CREATE POLICY "Allow public insert on contact_messages" ON contact_messages 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on contact_messages" ON contact_messages 
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to update contact messages" ON contact_messages 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ========================================
-- CREATE ACTIVITY LOGGING TRIGGER
-- ========================================
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_logs (user_id, action, table_name, record_id, changes)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    NEW.id,
    jsonb_build_object(
      'old_data', to_jsonb(OLD),
      'new_data', to_jsonb(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for activity logging
CREATE TRIGGER projects_activity_log AFTER INSERT OR UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER experiences_activity_log AFTER INSERT OR UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER skills_activity_log AFTER INSERT OR UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION log_activity();

-- ========================================
-- SEED INITIAL DATA
-- ========================================
-- Insert skill categories
INSERT INTO skill_categories (name, icon_name, display_order) VALUES
  ('Languages', 'code', 1),
  ('Frameworks', 'package', 2),
  ('Databases', 'database', 3),
  ('DevOps', 'cloud', 4),
  ('Tools', 'wrench', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert project categories
INSERT INTO project_categories (name, display_order) VALUES
  ('Web Application', 1),
  ('Backend System', 2),
  ('Full Stack', 3),
  ('Mobile App', 4),
  ('Infrastructure', 5)
ON CONFLICT (name) DO NOTHING;
