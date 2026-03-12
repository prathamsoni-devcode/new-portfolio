# Portfolio CMS - Complete Setup Guide

## Overview

You now have a fully functional portfolio management system with:
- Relational database with proper foreign keys and constraints
- Supabase Storage integration for profile pictures and resumes
- Email/password authentication with role-based access control
- Admin dashboard for managing content and users
- Audit logging for tracking changes

## Database Schema

### Core Tables

#### 1. **users** (Authentication & Profile)
- Linked to Supabase `auth.users`
- Roles: `admin`, `editor`, `viewer`
- Stores: profile picture URL, resume URL, bio, last login

#### 2. **projects** (Enhanced)
- Added: `created_by`, `updated_by` (FK to users), `category` (FK to project_categories)
- Tracks who created/updated each project

#### 3. **experiences** (Enhanced)
- Added: `created_by`, `updated_by` (FK to users)

#### 4. **skills** (Enhanced)
- Added: `created_by` (FK to users), `category_id` (FK to skill_categories)

#### 5. **skill_categories** (New)
- Organizes skills by category
- Includes: icon_name, display_order

#### 6. **project_categories** (New)
- Categorizes projects
- Replaces string-based categories

#### 7. **contact_messages** (Enhanced)
- Added: `assigned_to` (FK to users), `response`, `responded_at`, `priority`
- Allows admins to assign and respond to messages

#### 8. **activity_logs** (New)
- Audit trail for all changes
- Tracks: user_id, action (INSERT/UPDATE), table_name, changes (JSONB)
- Useful for debugging and compliance

## Authentication Setup

### 1. Run Database Migration

Execute the SQL migration script in your Supabase dashboard:

```bash
# In Supabase > SQL Editor, copy and run:
/scripts/setup-relational-schema.sql
```

### 2. Enable Supabase Storage

1. Go to Supabase Dashboard > Storage
2. Create a new bucket named `portfolio`
3. Set permissions:
   - Allow authenticated users to upload
   - Make files publicly accessible

### 3. Set Environment Variables

Your environment variables should already be set. Verify they include:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## User Roles & Permissions

### Admin
- ✅ Create, read, update, delete all content
- ✅ Manage users and roles
- ✅ View contact messages and assign to others
- ✅ Access activity logs
- ✅ Manage all settings

### Editor
- ✅ Create, read, update, delete own content
- ✅ Update profile (picture, resume, bio)
- ❌ Cannot manage other users
- ❌ Cannot view contact messages
- ❌ Cannot access activity logs

### Viewer
- ✅ View public portfolio
- ✅ Update own profile (picture, resume, bio)
- ❌ Cannot create/edit content
- ❌ Cannot access dashboard features

## File Structure

```
/app
  /auth
    /login          # Login page
    /signup         # Sign up page
  /dashboard        # Admin dashboard (protected)
    /page.tsx       # Dashboard overview
    /layout.tsx     # Dashboard layout with nav
    /profile        # User profile management
    /users          # User management (admin only)
    /projects       # Project management (to be created)
    /experiences    # Experience management (to be created)
    /skills         # Skills management (to be created)
    /messages       # Message management (to be created)

/lib
  /auth.ts          # Authentication utilities
  /api-auth.ts      # API middleware for protected routes

/scripts
  /setup-relational-schema.sql  # Database migration
```

## API Integration

### Protected Endpoints

Use the middleware in your API routes:

```typescript
// Admin only
import { withAdminAuth } from '@/lib/api-auth'

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, userId) => {
    // Your admin logic here
    return NextResponse.json({ success: true })
  })
}

// Editor or Admin
import { withEditorAuth } from '@/lib/api-auth'

export async function POST(request: NextRequest) {
  return withEditorAuth(request, async (req, userId) => {
    // Your editor logic here
    return NextResponse.json({ success: true })
  })
}
```

## Feature Implementation Checklist

### ✅ Completed
- [x] Relational database schema with constraints
- [x] User authentication system
- [x] Role-based access control (RBAC)
- [x] Supabase Storage integration
- [x] Profile picture upload
- [x] Resume file upload
- [x] Admin dashboard layout
- [x] User management page
- [x] Activity logging system
- [x] API middleware for protected routes

### 📋 Next Steps
- [ ] Create projects management page (`/app/dashboard/projects`)
- [ ] Create experiences management page (`/app/dashboard/experiences`)
- [ ] Create skills management page (`/app/dashboard/skills`)
- [ ] Create contact messages page (`/app/dashboard/messages`)
- [ ] Update API routes with role-based protection
- [ ] Add email notifications for new messages
- [ ] Create activity log viewer
- [ ] Add backup/export functionality

## Usage Examples

### Login
```
URL: /auth/login
Username: your@email.com
Password: your_password
```

### Access Dashboard
```
Only logged-in users can access /dashboard
Editors and above can create/edit content
Only admins can manage users
```

### Upload Files
```
Profile Picture: JPEG, PNG (auto-compressed)
Resume: PDF, DOCX, DOC
Both stored in Supabase Storage bucket
Public URLs generated automatically
```

## Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. **API middleware** validates user roles on protected endpoints
3. **Activity logs** track all changes for audit purposes
4. **Service role key** is only used server-side
5. **Anon key** is used client-side for appropriate operations

## Troubleshooting

### Users can't login
- Check email is verified in Supabase Auth
- Ensure user record exists in `users` table
- Verify role is set correctly

### Files not uploading
- Check Supabase Storage bucket permissions
- Ensure bucket is named `portfolio`
- Verify CORS settings if uploading from different domain

### Permission denied errors
- Check user role in `users` table
- Verify RLS policies are enabled
- Check API middleware is correctly implemented

## Support

For Supabase issues: https://supabase.com/support
For Next.js issues: https://nextjs.org/docs
For this project: Check the repository documentation
