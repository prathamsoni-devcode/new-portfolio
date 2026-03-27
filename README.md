# Pratham Soni - Portfolio Website

A modern, full-featured portfolio website built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase. Features a complete admin dashboard with role-based access control, relational database with comprehensive data management, and seamless file storage integration.

## 🚀 Features

- **Modern UI/UX**: Responsive design with smooth animations and dark/light theme support
- **Admin Dashboard**: Complete CRUD operations for all portfolio content with role-based access control
- **Relational Database**: Normalized schema with proper relationships and constraints
- **File Storage**: Resume uploads to Supabase Storage with public access links
- **Dynamic Content**: Projects, experiences, skills, education, and certifications managed via database
- **Sub-skills System**: Skills with frameworks and tools as sub-categories (e.g., Spring Boot → Spring Security, REST APIs)
- **Project Categories**: Organize projects by type (Backend, Frontend, Full Stack, etc.)
- **Contact Management**: Centralized contact information table with social links
- **SEO Optimized**: Comprehensive metadata and Open Graph support
- **Fully Responsive**: Mobile-first design optimized for all devices
- **Authentication**: Email/password login with Supabase Auth and user roles

## 📊 Database Schema

### Core Tables with Relational Mapping

| Table | Purpose | Relations |
|-------|---------|-----------|
| `contact_info` | Email, phone, social links, location | - |
| `resumes` | Resume files stored in Supabase Storage | linked to users |
| `skill_categories` | Skill groupings (Languages, Frameworks, Cloud, Tools, AI) | 1:N skills |
| `skills` | Individual skills with proficiency levels | N:1 categories, 1:N sub_skills |
| `skill_sub_skills` | Sub-skills under each skill (frameworks, tools) | N:1 skills |
| `project_categories` | Project types (Backend, Frontend, Full Stack, Open Source) | 1:N projects |
| `projects` | Portfolio projects with descriptions | N:1 categories, 1:N technologies |
| `project_technologies` | Technologies used in projects | N:1 projects, N:1 skills |
| `experiences` | Work experience with company info | 1:N responsibilities |
| `experience_responsibilities` | Detailed responsibilities for each role | N:1 experiences |
| `education` | Educational background and achievements | - |
| `certifications` | Professional certifications | - |
| `contact_messages` | Contact form submissions | - |

### Sample Relations

**Skills Hierarchy:**
```
Skill Category: Frameworks & Libraries
  ├── Skill: Spring Boot (Expert)
  │   ├── Sub-skill: Spring Security
  │   ├── Sub-skill: REST APIs
  │   ├── Sub-skill: Microservices
  │   └── Sub-skill: Spring Data JPA
  ├── Skill: Flutter (Advanced)
  │   ├── Sub-skill: Flutter Web
  │   ├── Sub-skill: Mobile App
  │   └── Sub-skill: State Management
  └── Skill: Next.js (Advanced)
      ├── Sub-skill: Server Components
      └── Sub-skill: API Routes
```

**Project Categories:**
```
Backend Development
  └── Uber Spring Boot App
      ├── Spring Boot
      ├── Spring Security
      ├── PostgreSQL
      └── PostGIS
```

## 🛠 Tech Stack

- **Framework**: Next.js 15.1.8
- **Runtime**: React 19.2.4 with TypeScript 5.10.1
- **Styling**: Tailwind CSS 3.4.20 with shadcn/ui components
- **Database**: Supabase PostgreSQL with RLS policies
- **Storage**: Supabase Storage for file uploads
- **Authentication**: Supabase Auth with email/password
- **Icons**: Lucide React 0.500.0
- **UI Components**: Radix UI with Tailwind CSS

## 📦 Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact-info/        # GET contact information
│   │   ├── projects/            # GET projects with filtering
│   │   ├── skills/              # GET skills with sub-skills
│   │   ├── experiences/         # GET experiences with responsibilities
│   │   └── resume/download/     # GET resume download link
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── profile/
│   │   └── users/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx
│   ├── hero-section.tsx
│   ├── projects-section.tsx
│   ├── skills-section.tsx
│   ├── experiences-section.tsx
│   └── footer.tsx
├── hooks/
│   └── useFetchPortfolioData.ts
├── lib/
│   ├── auth.ts
│   ├── api-auth.ts
│   └── utils.ts
└── scripts/
    ├── 001-create-complete-schema.sql
    ├── 002-insert-pratham-data.sql
    └── upload-resume.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account and project
- Environment variables configured

### Environment Variables

```env
# Public
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Server-side only
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run database migrations in Supabase SQL Editor**
   - Go to Supabase Dashboard → SQL Editor
   - Execute `/scripts/001-create-complete-schema.sql` to create all tables
   - Execute `/scripts/002-insert-pratham-data.sql` to insert data

3. **Upload resume to Supabase Storage**
   ```bash
   node scripts/upload-resume.js
   ```
   This script:
   - Uploads PDF to Supabase Storage
   - Creates database record with metadata
   - Generates public download URL

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full access to dashboard and user management
- **Editor**: Can create and edit portfolio content
- **Viewer**: Read-only access

### Default Account

First user to sign up becomes admin automatically. Create account at `/auth/signup`.

## 📝 API Endpoints

### Public Endpoints

```
GET  /api/projects?category=all|backend|frontend    # Projects with filtering
GET  /api/skills?featured=true                       # Skills with sub-skills
GET  /api/experiences                                # Experiences with responsibilities
GET  /api/contact-info                               # Contact information
GET  /api/resume/download                            # Resume download link
```

### Protected Endpoints

All dashboard endpoints require authentication via Supabase Auth.

## 🎨 Managing Content

### Update Contact Information
- Edit `contact_info` table directly in Supabase
- Update email, phone, location, social links

### Add Skills
1. Dashboard → Skills section
2. Add category if needed
3. Add skill with proficiency level
4. Add sub-skills (frameworks, tools)
5. Mark as featured for homepage display

### Create Projects
1. Dashboard → Projects
2. Create project with title, description, category
3. Add technologies used
4. Link GitHub/live URLs
5. Set featured status

### Upload Resume
1. Dashboard → Profile
2. Upload new PDF file
3. File stored in Supabase Storage
4. Previous version deactivated automatically

## 📊 Data from Resume

Pre-populated data from Pratham Soni's resume:

**Contact Info:**
- Email: pratham1108soni@gmail.com
- Phone: +91-9079843800
- Location: Pune, India

**Current Experience:**
- Software Engineer at ConsultAdd (Feb 2024 - Present)

**Key Skills:**
- Programming: Java, Kotlin, Dart, SQL, TypeScript
- Frameworks: Spring Boot, Flutter, Next.js, LangChain
- Cloud: AWS, Google Cloud, Firebase, Supabase
- AI/ML: RAG, Embeddings, Vector Databases, LLM APIs

**Projects:**
- Uber Spring Boot App (Ride-booking backend with Strategy Pattern)

**Education:**
- B.Tech Computer Science, Arya College of Engineering (2020-2024, CGPA: 8.3)

**Certifications:**
- AWS Solutions Architect Associate

## 🔍 Performance

- Lighthouse Score: 90+
- Bundle size: ~150KB (optimized)
- Image optimization: WebP/AVIF enabled
- CSS minification: Automatic
- Caching: Configured for production

## 📱 Responsive Design

- Mobile: 320px and up
- Tablet: 768px and up
- Desktop: 1024px and up
- 4K: 1920px and up

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm start
```

## 📄 License

MIT

## 👤 Author

**Pratham Soni**

- Email: pratham1108soni@gmail.com
- GitHub: [prathamsoni-devcode](https://github.com/prathamsoni-devcode)
- LinkedIn: [pratham1108soni](https://linkedin.com/in/pratham1108soni)
- Portfolio: [prathamsoni.vercel.app](https://prathamsoni.vercel.app)

---

**Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase**
