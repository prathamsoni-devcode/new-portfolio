'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser, getUserProfile } from '@/lib/auth'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Users, MessageSquare, Zap } from 'lucide-react'

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          const profileData = await getUserProfile(user.id)
          setProfile(profileData || {
            full_name: user.email?.split('@')[0] || 'User',
            role: 'viewer',
          })

          // Load statistics
          try {
            const projectRes = await fetch('/api/projects')
            const projectData = await projectRes.json()

            const expRes = await fetch('/api/experiences')
            const expData = await expRes.json()

            const skillRes = await fetch('/api/skills')
            const skillData = await skillRes.json()

            setStats({
              projects: Array.isArray(projectData) ? projectData.length : 0,
              experiences: Array.isArray(expData) ? expData.length : 0,
              skills: Array.isArray(skillData) ? skillData.length : 0,
              messages: 0,
            })
          } catch (error) {
            console.error('Error loading stats:', error)
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        setProfile({ full_name: 'User', role: 'viewer' })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const isAdmin = profile?.role === 'admin'
  const canEdit = profile?.role === 'admin' || profile?.role === 'editor'

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome, {profile?.full_name || 'User'}!</h1>
        <p className="text-muted-foreground">Manage your portfolio and profile content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Projects</p>
              <p className="text-3xl font-bold">{stats.projects}</p>
            </div>
            <FileText className="h-12 w-12 text-primary/20" />
          </div>
          {canEdit && (
            <Link href="/dashboard/projects">
              <Button variant="outline" className="w-full">
                Manage
              </Button>
            </Link>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Experiences</p>
              <p className="text-3xl font-bold">{stats.experiences}</p>
            </div>
            <Zap className="h-12 w-12 text-primary/20" />
          </div>
          {canEdit && (
            <Link href="/dashboard/experiences">
              <Button variant="outline" className="w-full">
                Manage
              </Button>
            </Link>
          )}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Skills</p>
              <p className="text-3xl font-bold">{stats.skills}</p>
            </div>
            <Zap className="h-12 w-12 text-primary/20" />
          </div>
          {canEdit && (
            <Link href="/dashboard/skills">
              <Button variant="outline" className="w-full">
                Manage
              </Button>
            </Link>
          )}
        </Card>

        {isAdmin && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-3xl font-bold">{stats.messages}</p>
              </div>
              <MessageSquare className="h-12 w-12 text-primary/20" />
            </div>
            <Link href="/dashboard/messages">
              <Button variant="outline" className="w-full">
                View
              </Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {canEdit && (
            <>
              <Link href="/dashboard/projects?new=true">
                <Button variant="outline" className="w-full">
                  Add Project
                </Button>
              </Link>
              <Link href="/dashboard/experiences?new=true">
                <Button variant="outline" className="w-full">
                  Add Experience
                </Button>
              </Link>
              <Link href="/dashboard/skills?new=true">
                <Button variant="outline" className="w-full">
                  Add Skill
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full">
                  Update Profile
                </Button>
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/dashboard/users">
              <Button variant="outline" className="w-full">
                Manage Users
              </Button>
            </Link>
          )}
        </div>
      </Card>

      {/* Role Information */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-bold mb-2">Your Role: {profile?.role.toUpperCase()}</h3>
        <p className="text-sm text-muted-foreground">
          {profile?.role === 'admin'
            ? 'You have full access to manage all content and users.'
            : profile?.role === 'editor'
              ? 'You can create and edit content but cannot manage users.'
              : 'You have view-only access to the portfolio.'}
        </p>
      </Card>
    </div>
  )
}
