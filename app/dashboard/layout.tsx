'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getUserProfile } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/auth/login')
          return
        }
        setUser(currentUser)

        const userProfile = await getUserProfile(currentUser.id)
        setProfile(userProfile)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const isAdmin = profile?.role === 'admin'
  const canEdit = profile?.role === 'admin' || profile?.role === 'editor'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-xl font-bold">
              Portfolio Admin
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm hover:text-primary">
                Overview
              </Link>
              {canEdit && (
                <>
                  <Link href="/dashboard/projects" className="text-sm hover:text-primary">
                    Projects
                  </Link>
                  <Link href="/dashboard/experiences" className="text-sm hover:text-primary">
                    Experiences
                  </Link>
                  <Link href="/dashboard/skills" className="text-sm hover:text-primary">
                    Skills
                  </Link>
                  <Link href="/dashboard/profile" className="text-sm hover:text-primary">
                    Profile
                  </Link>
                </>
              )}
              {isAdmin && (
                <>
                  <Link href="/dashboard/messages" className="text-sm hover:text-primary">
                    Messages
                  </Link>
                  <Link href="/dashboard/users" className="text-sm hover:text-primary">
                    Users
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span>{profile?.full_name || 'User'}</span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                {(profile?.role || 'viewer').toUpperCase()}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 space-y-2">
            <Link href="/dashboard" className="block text-sm hover:text-primary py-2">
              Overview
            </Link>
            {canEdit && (
              <>
                <Link href="/dashboard/projects" className="block text-sm hover:text-primary py-2">
                  Projects
                </Link>
                <Link href="/dashboard/experiences" className="block text-sm hover:text-primary py-2">
                  Experiences
                </Link>
                <Link href="/dashboard/skills" className="block text-sm hover:text-primary py-2">
                  Skills
                </Link>
                <Link href="/dashboard/profile" className="block text-sm hover:text-primary py-2">
                  Profile
                </Link>
              </>
            )}
            {isAdmin && (
              <>
                <Link href="/dashboard/messages" className="block text-sm hover:text-primary py-2">
                  Messages
                </Link>
                <Link href="/dashboard/users" className="block text-sm hover:text-primary py-2">
                  Users
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-8">{!loading && children}</main>
    </div>
  )
}
