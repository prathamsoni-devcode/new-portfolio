import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // 'all', 'backend', 'frontend', 'fullstack'

    let query = supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        long_description,
        image_url,
        github_url,
        live_url,
        is_featured,
        start_date,
        end_date,
        display_order,
        project_categories (name),
        project_technologies (technology_name)
      `)
      .order('display_order', { ascending: true })

    // Filter by category if specified
    if (category && category !== 'all') {
      const { data: categoryData } = await supabase
        .from('project_categories')
        .select('id')
        .eq('name', category)
        .single()

      if (categoryData) {
        query = query.eq('category_id', categoryData.id)
      }
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in projects GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
