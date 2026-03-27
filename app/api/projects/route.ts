import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fallback data when table doesn't exist
const fallbackProjects = [
  {
    id: 1,
    title: 'Uber Spring Boot App',
    description: 'Designed a ride-booking backend system implementing strategy patterns for driver allocation and fare calculation. Features geospatial queries with PostGIS for proximity-based driver matching and JWT-based authentication.',
    image_url: '/images/pratham-profile.jpg',
    technologies: ['Spring Boot', 'Postgres', 'PostGIS', 'JWT'],
    github_url: 'https://github.com/prathamsoni11',
    live_url: '',
    created_at: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    // If table doesn't exist, return fallback data
    if (error?.code === 'PGRST116' || error?.message?.includes('relation "public.projects" does not exist')) {
      console.log('Projects table not found, using fallback data')
      return NextResponse.json(fallbackProjects)
    }

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(fallbackProjects)
    }

    return NextResponse.json(data || fallbackProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return fallback data on any error instead of 500
    return NextResponse.json(fallbackProjects)
  }
}
