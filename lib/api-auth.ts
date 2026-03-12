import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authentication' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    return handler(request, data.user.id)
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function withAdminAuth(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authentication' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Check user role
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profileError || profileData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    return handler(request, data.user.id)
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function withEditorAuth(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authentication' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Check user role
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (
      profileError ||
      (profileData?.role !== 'admin' && profileData?.role !== 'editor')
    ) {
      return NextResponse.json(
        { error: 'Editor access required' },
        { status: 403 }
      )
    }

    return handler(request, data.user.id)
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
