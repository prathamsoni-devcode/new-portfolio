# Setup Instructions

Complete guide to set up Pratham Soni's Portfolio Website.

## 1. Database Setup (Supabase)

### Step 1: Run Database Schema Migration

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy and execute the contents of `/scripts/001-create-complete-schema.sql`

This creates all 13 tables with proper relationships and indexes:
- contact_info
- resumes
- skill_categories, skills, skill_sub_skills
- project_categories, projects, project_technologies
- experiences, experience_responsibilities
- education, certifications, contact_messages

### Step 2: Insert Pratham's Data

1. In SQL Editor → **New Query**
2. Copy and execute the contents of `/scripts/002-insert-pratham-data.sql`

This populates the database with:
- Contact information (email, phone, location, social links)
- Skill categories (5 categories: Languages, Frameworks, Cloud, Tools, AI/ML)
- Skills with proficiency levels and sub-skills
- Current job experience at ConsultAdd
- Project: Uber Spring Boot App
- Education from Arya College of Engineering
- AWS Solutions Architect certification

## 2. Resume Upload to Supabase Storage

### Step 1: Prepare Environment

Ensure you have environment variables set:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 2: Run Upload Script

```bash
node scripts/upload-resume.js
```

This script:
1. Reads `user_read_only_context/text_attachments/PrathamSoni_Resume-wqiEN.pdf`
2. Uploads to `resumes/` bucket in Supabase Storage
3. Creates database record in `resumes` table
4. Generates public download URL
5. Outputs resume metadata

**Expected Output:**
```
✓ Resume successfully uploaded and recorded!
Resume Details:
  - File: PrathamSoni_Resume.pdf
  - Size: 45KB
  - Storage Path: resumes/1234567890-PrathamSoni_Resume.pdf
  - Public URL: https://xxx.supabase.co/storage/v1/object/public/resumes/...
  - Database ID: uuid
```

**After successful upload, delete the script:**
```bash
rm scripts/upload-resume.js
```

## 3. Create Supabase Storage Bucket

If not created automatically by upload script:

1. Go to **Storage** in Supabase Dashboard
2. Click **Create new bucket**
3. Name: `resumes`
4. Make it **Public**
5. Click **Create bucket**

## 4. Configure Row Level Security (RLS)

The tables have RLS policies. To enable them:

1. Go to **Authentication** → **Policies**
2. For each table, verify RLS is enabled
3. Policies are pre-configured for:
   - Users can view own data
   - Admins can view all
   - Contact form is write-only for public

## 5. Application Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages:
- next@15.1.8
- react@19.2.4
- @supabase/supabase-js@2.52.0
- tailwindcss@3.4.20
- And 8 more dependencies

### Step 2: Set Environment Variables

Create `.env.local` with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Get these from Supabase Dashboard → Settings → API

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Step 4: Create Admin Account

1. Go to `/auth/signup`
2. Enter email and password
3. First user becomes admin
4. Verify email (check Supabase Auth)
5. Login at `/auth/login`

### Step 5: Access Dashboard

After login, navigate to `/dashboard`

## 6. Verify Setup

### Homepage
- [ ] Navigation bar visible
- [ ] Hero section with typing animation
- [ ] Project cards showing Uber Spring Boot App
- [ ] Skills section showing all categories
- [ ] Experiences section showing ConsultAdd job
- [ ] Contact form functional

### Dashboard
- [ ] Can access `/dashboard` when logged in
- [ ] Can view profile page
- [ ] Can upload/update resume
- [ ] Can see portfolio overview with stats
- [ ] Admin users can access users management

### API Endpoints
```bash
# Test APIs
curl http://localhost:3000/api/projects
curl http://localhost:3000/api/skills
curl http://localhost:3000/api/experiences
curl http://localhost:3000/api/contact-info
curl http://localhost:3000/api/resume/download
```

## 7. Update Content

### Add New Project

1. Dashboard → (Projects section if available)
2. Or directly in Supabase → projects table
3. Fill in:
   - title
   - description
   - category_id (reference project_categories)
   - github_url, live_url
   - technologies via project_technologies table

### Add New Skill

1. Dashboard → (Skills section if available)
2. Or directly in Supabase → skills table
3. Add skill_category_id
4. Add sub-skills in skill_sub_skills table

### Update Resume

1. Dashboard → Profile
2. Upload new PDF file
3. Old resume auto-deactivated

## 8. Cleanup

### Remove Setup Files

After successful setup, remove:
```bash
# If you ran the upload script
rm scripts/upload-resume.js

# Optional: Keep SQL scripts for reference
# Or remove if you prefer to manage via Supabase UI
rm scripts/001-create-complete-schema.sql
rm scripts/002-insert-pratham-data.sql
```

## Troubleshooting

### Database Connection Issues

**Error: "Relation does not exist"**
- Run migration scripts again in SQL Editor
- Check Supabase project is selected
- Verify service role key is correct

### Resume Upload Fails

**Error: "Bucket does not exist"**
- Create `resumes` bucket manually in Storage
- Make it Public
- Re-run upload script

**Error: "File not found"**
- Ensure PDF exists at `user_read_only_context/text_attachments/PrathamSoni_Resume-wqiEN.pdf`
- Check file name spelling and path

### Login Issues

**Error: "Invalid credentials"**
- Check email and password match
- Verify email confirmed in Supabase Auth
- Check timezone settings in Supabase

**Error: "JWT expired"**
- Clear browser cookies
- Logout and login again

### Build Errors

**Error: "Module not found"**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

## Need Help?

- Check Supabase logs: Dashboard → Logs
- Review Next.js errors: Check terminal output
- Database issues: Test queries in SQL Editor first
- Auth issues: Check Supabase Auth → Users

---

**Setup Complete!** 🎉 Your portfolio is ready to use.
