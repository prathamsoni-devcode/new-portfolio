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
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data as ProfileData
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
      },
    },
  })

  if (error) {
    throw error
  }

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: 'viewer',
        },
      ])

    if (profileError) {
      console.error('Error creating profile:', profileError)
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
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

// Check if user is admin
export async function isAdmin(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile?.role === 'admin'
}

// Check if user can edit
export async function canEditContent(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile?.role === 'admin' || profile?.role === 'editor'
}
