'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getUserProfile, canEditContent } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface User {
  id: string
  email: string
  full_name: string | null
  role: string
  is_active: boolean
  created_at: string
  last_login: string | null
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null)

  useEffect(() => {
    const checkAuthAndLoadUsers = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push('/auth/login')
          return
        }

        const profile = await getUserProfile(user.id)
        if (profile?.role !== 'admin') {
          router.push('/dashboard')
          return
        }

        setCurrentUserRole(profile.role)

        // Load users
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setUsers(data || [])
      } catch (err) {
        setError('Failed to load users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoadUsers()
  }, [router])

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      )
    } catch (err) {
      setError('Failed to update user role')
    }
  }

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_active: !currentStatus })
        .eq('id', userId)

      if (error) throw error

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_active: !currentStatus } : u
        )
      )
    } catch (err) {
      setError('Failed to update user status')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  if (currentUserRole !== 'admin') {
    return (
      <Card className="p-6 text-center">
        <p className="text-destructive">You do not have permission to access this page.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Last Login</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm">{user.full_name || '-'}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="px-3 py-1 border border-border rounded-md text-sm"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge
                      variant={user.is_active ? 'default' : 'secondary'}
                      onClick={() => handleToggleActive(user.id, user.is_active)}
                      className="cursor-pointer"
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString()
                      : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(user.id, user.is_active)}
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {users.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No users found</p>
        </Card>
      )}
    </div>
  )
}
