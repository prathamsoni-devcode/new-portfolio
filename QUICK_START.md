# Quick Start Guide

Fast-track setup and common commands for Pratham Soni's Portfolio.

## 🚀 5-Minute Setup

### 1. Database Setup (Supabase Dashboard)

Go to [SQL Editor](https://app.supabase.com) and run these in order:

**Query 1:** Create Schema
```bash
# Copy contents of /scripts/001-create-complete-schema.sql
# Paste in SQL Editor → Run
```

**Query 2:** Insert Data
```bash
# Copy contents of /scripts/002-insert-pratham-data.sql
# Paste in SQL Editor → Run
```

### 2. Upload Resume

```bash
# Run from project root
node scripts/upload-resume.js

# Delete after completion
rm scripts/upload-resume.js
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### 4. Create Admin Account

1. Go to `http://localhost:3000/auth/signup`
2. Enter email and password
3. First user becomes admin automatically
4. Login at `http://localhost:3000/auth/login`
5. Access dashboard: `http://localhost:3000/dashboard`

---

## 📋 Essential Commands

### Development

```bash
# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# View TypeScript errors
npm run type-check
```

### Database

```bash
# Execute SQL migration (in Supabase SQL Editor)
# 1. Open: https://app.supabase.com → SQL Editor
# 2. Paste contents of: /scripts/001-create-complete-schema.sql
# 3. Run

# Insert test data (in Supabase SQL Editor)
# 1. Paste contents of: /scripts/002-insert-pratham-data.sql
# 2. Run
```

### Resume Upload

```bash
# Upload resume to Supabase Storage
node scripts/upload-resume.js

# Clean up after upload
rm scripts/upload-resume.js
```

### Deployment

```bash
# Preview build locally
npm run build
npm start

# Deploy to Vercel (requires GitHub + Vercel account)
git push origin main
# Automatically deploys via Vercel webhook
```

---

## 📍 Important URLs

### Local Development
- Homepage: http://localhost:3000
- Login: http://localhost:3000/auth/login
- Signup: http://localhost:3000/auth/signup
- Dashboard: http://localhost:3000/dashboard

### API Endpoints
- Projects: http://localhost:3000/api/projects
- Skills: http://localhost:3000/api/skills
- Experiences: http://localhost:3000/api/experiences
- Contact Info: http://localhost:3000/api/contact-info
- Resume: http://localhost:3000/api/resume/download

### External Links
- Supabase: https://app.supabase.com
- Vercel: https://vercel.com
- GitHub: https://github.com/prathamsoni-devcode

---

## 🔐 Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Get from Supabase Dashboard → Settings → API

---

## 🎯 Common Tasks

### Add New Project

**Option 1: Direct Database Entry**
```sql
-- In Supabase SQL Editor
INSERT INTO projects (title, description, category_id, github_url, display_order)
VALUES (
  'New Project',
  'Description here',
  (SELECT id FROM project_categories WHERE name = 'Backend Development'),
  'https://github.com/prathamsoni-devcode/project',
  2
);
```

**Option 2: Dashboard (if implemented)**
- Navigate to Dashboard → Projects
- Click "Add Project"
- Fill in details
- Save

### Add New Skill

```sql
-- Add skill category if needed
INSERT INTO skill_categories (name, description)
VALUES ('New Category', 'Description')
ON CONFLICT (name) DO NOTHING;

-- Add skill
INSERT INTO skills (name, category_id, proficiency_level, is_featured)
VALUES (
  'New Skill',
  (SELECT id FROM skill_categories WHERE name = 'New Category'),
  'Advanced',
  false
);

-- Add sub-skills
INSERT INTO skill_sub_skills (skill_id, name, description)
VALUES (
  (SELECT id FROM skills WHERE name = 'New Skill'),
  'Sub-skill Name',
  'Description'
);
```

### Update Contact Info

```sql
UPDATE contact_info
SET email = 'newemail@example.com',
    phone = '+1-234-567-8900',
    location = 'New City, Country'
WHERE id = (SELECT id FROM contact_info LIMIT 1);
```

### Upload New Resume

```bash
# Place new PDF in project root or update path in script
node scripts/upload-resume.js

# Old resume automatically deactivated
# New resume set as active
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Clear Node Modules

```bash
rm -rf node_modules package-lock.json
npm install
```

### Rebuild Project

```bash
rm -rf .next
npm run build
npm start
```

### Check TypeScript Errors

```bash
npx tsc --noEmit
```

### View Supabase Logs

1. Go to Supabase Dashboard
2. Click on project
3. Go to "Logs" section
4. View real-time errors

---

## 📊 Testing APIs

### Using curl

```bash
# Get projects
curl http://localhost:3000/api/projects

# Get skills
curl http://localhost:3000/api/skills

# Get experiences
curl http://localhost:3000/api/experiences

# Get contact info
curl http://localhost:3000/api/contact-info

# Get resume
curl http://localhost:3000/api/resume/download
```

### Using Postman

1. Open [Postman](https://www.postman.com/)
2. Create new request
3. Method: GET
4. URL: http://localhost:3000/api/projects
5. Send

---

## 📁 Project Structure Quick Ref

```
/app               # Next.js app directory
  /api             # API routes
  /auth            # Auth pages
  /dashboard       # Protected dashboard
  layout.tsx       # Root layout
  page.tsx         # Homepage
  globals.css      # Global styles

/components        # React components
  /ui              # Shadcn/ui components
  navbar.tsx       # Header
  footer.tsx       # Footer

/hooks             # Custom React hooks
  useFetchPortfolioData.ts

/lib               # Utilities
  auth.ts          # Auth utilities
  utils.ts         # Helper functions

/scripts           # Setup scripts
  001-*.sql        # Database schema
  002-*.sql        # Data insertion
  upload-resume.js # Resume upload

/public            # Static assets
  /images          # Project images
```

---

## 🚀 Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations completed
- [ ] Resume uploaded to Supabase Storage
- [ ] Admin account created
- [ ] Homepage tested locally
- [ ] Dashboard tested with login
- [ ] API endpoints tested
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Push to GitHub
- [ ] Vercel auto-deploys

---

## 💡 Pro Tips

1. **Always backup database** before major changes
   - Supabase Dashboard → Backups

2. **Test locally first** before deploying
   - Run `npm run build` to catch errors early

3. **Use Supabase Studio** for direct database management
   - Easy table browser and query editor
   - Built-in authentication management

4. **Monitor Vercel logs** in production
   - Vercel Dashboard → Deployments → Function Logs

5. **Keep resume updated** regularly
   - New version auto-activates
   - Old versions preserved

---

## 📞 Support

For issues:
1. Check Supabase logs
2. Check Vercel logs
3. Review error messages in browser console
4. Check `/SETUP_INSTRUCTIONS.md` troubleshooting section

---

**Ready to go!** 🚀 Follow the 5-minute setup and you're all set.
