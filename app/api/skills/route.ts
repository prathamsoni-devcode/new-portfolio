import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') // 'true' for featured only

    let query = supabase
      .from('skill_categories')
      .select(`
        id,
        name,
        description,
        display_order,
        skills (
          id,
          name,
          proficiency_level,
          is_featured,
          display_order,
          skill_sub_skills (
            id,
            name,
            description,
            display_order
          )
        )
      `)
      .order('display_order', { ascending: true })

    const { data: categories, error } = await query

    if (error) {
      console.error('Error fetching skills:', error)
      return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
    }

    // Filter featured skills if requested
    if (featured === 'true') {
      const filteredCategories = categories?.map(cat => ({
        ...cat,
        skills: cat.skills?.filter(s => s.is_featured) || [],
      })).filter(cat => cat.skills.length > 0)

      return NextResponse.json(filteredCategories || [])
    }

    return NextResponse.json(categories || [])
  } catch (error) {
    console.error('Error in skills GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
