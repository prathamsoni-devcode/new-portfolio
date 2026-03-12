import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type UserRole = 'admin' | 'editor' | 'viewer'

export interface PortfolioUser extends User {
  user_metadata?: {
    full_name?: string
    role?: UserRole
  }
}

export interface ProfileData {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  profile_picture_url: string | null
  resume_url: string | null
  bio: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

// Get current user's profile data
export async function getUserProfile(userId: string): Promise<ProfileData | null> {
  try {
    // First try to get from profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) {
      return data as ProfileData
    }

    // If not found, get from auth metadata
    const { data: authData } = await supabase.auth.admin.getUserById(userId)
    if (authData?.user) {
      return {
        id: authData.user.id,
        email: authData.user.email || '',
        full_name: authData.user.user_metadata?.full_name || null,
        role: authData.user.user_metadata?.role || 'viewer',
        profile_picture_url: authData.user.user_metadata?.profile_picture_url || null,
        resume_url: authData.user.user_metadata?.resume_url || null,
        bio: authData.user.user_metadata?.bio || null,
        is_active: !authData.user.banned_until,
        created_at: authData.user.created_at,
        updated_at: authData.user.updated_at,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return null
  }

  return data.user
}

// Sign up new user
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'viewer', // Default role for new users
        profile_picture_url: null,
        resume_url: null,
        bio: null,
      },
    },
  })

  if (error) {
    throw error
  }

  // Optional: Try to create profile in profiles table if it exists
  if (data.user) {
    try {
      await supabase.from('profiles').insert([
        {
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: 'viewer',
          profile_picture_url: null,
          resume_url: null,
          bio: null,
          is_active: true,
        },
      ])
    } catch (profileError) {
      // Profile table might not exist yet, but auth metadata is set
      console.log('Profile table insert skipped (table may not exist yet)')
    }
  }

  return data
}

// Sign in user
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

// Sign out user
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

// Update user profile
export async function updateUserProfile(userId: string, updates: Partial<ProfileData>) {
  // Update both in auth metadata and profiles table
  const { data: { user }, error: authError } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      full_name: updates.full_name,
      role: updates.role,
      profile_picture_url: updates.profile_picture_url,
      resume_url: updates.resume_url,
      bio: updates.bio,
    },
  })

  if (authError) {
    console.error('Error updating auth metadata:', authError)
  }

  // Try to update profiles table if it exists
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return data
  } catch (error) {
    console.log('Profiles table update skipped:', error)
    return user
  }
}

// Check if user is admin
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
    if (error || !user) return false
    return user.user_metadata?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

// Check if user can edit
export async function canEditContent(userId: string): Promise<boolean> {
  try {
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
    if (error || !user) return false
    const role = user.user_metadata?.role
    return role === 'admin' || role === 'editor'
  } catch (error) {
    console.error('Error checking edit permissions:', error)
    return false
  }
}
