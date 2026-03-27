import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching skills:', error)
      return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in skills GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
