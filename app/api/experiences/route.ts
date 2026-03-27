import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select(`
        id,
        job_title,
        company_name,
        company_url,
        description,
        start_date,
        end_date,
        is_current,
        display_order,
        experience_responsibilities (
          id,
          responsibility,
          display_order
        )
      `)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching experiences:', error)
      return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in experiences GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
