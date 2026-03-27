import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fallback data when table doesn't exist
const fallbackSkills = [
  {
    id: 1,
    name: 'JavaScript',
    category: 'Programming',
    proficiency: 'Expert',
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'React',
    category: 'Frontend',
    proficiency: 'Expert',
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'TypeScript',
    category: 'Programming',
    proficiency: 'Advanced',
    display_order: 3,
    created_at: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })

    // If table doesn't exist, return fallback data
    if (error?.code === 'PGRST116' || error?.message?.includes('relation "public.skills" does not exist')) {
      console.log('Skills table not found, using fallback data')
      return NextResponse.json(fallbackSkills)
    }

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(fallbackSkills)
    }

    return NextResponse.json(data || fallbackSkills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    // Return fallback data on any error instead of 500
    return NextResponse.json(fallbackSkills)
  }
}
