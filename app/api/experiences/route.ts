import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fallback data when table doesn't exist
const fallbackExperiences = [
  {
    id: 1,
    company: 'Tech Company',
    position: 'Software Developer',
    duration: '2023 - Present',
    description: 'Working on full-stack web applications',
    display_order: 1,
    created_at: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true })

    // If table doesn't exist, return fallback data
    if (error?.code === 'PGRST116' || error?.message?.includes('relation "public.experiences" does not exist')) {
      console.log('Experiences table not found, using fallback data')
      return NextResponse.json(fallbackExperiences)
    }

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(fallbackExperiences)
    }

    return NextResponse.json(data || fallbackExperiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    // Return fallback data on any error instead of 500
    return NextResponse.json(fallbackExperiences)
  }
}
