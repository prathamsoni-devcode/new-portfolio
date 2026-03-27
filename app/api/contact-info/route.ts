import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Contact information not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      email: data.email,
      phone: data.phone,
      location: data.location,
      linkedin: data.linkedin_url,
      github: data.github_url,
      portfolio: data.portfolio_url,
    })
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact information' },
      { status: 500 }
    )
  }
}
