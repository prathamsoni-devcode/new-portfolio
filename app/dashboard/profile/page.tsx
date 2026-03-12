'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getUserProfile, updateUserProfile } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadingPicture, setUploadingPicture] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)

  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    profile_picture_url: '',
    resume_url: '',
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push('/auth/login')
          return
        }

        const profileData = await getUserProfile(user.id)
        if (profileData) {
          setProfile(profileData)
          setFormData({
            full_name: profileData.full_name || '',
            bio: profileData.bio || '',
            profile_picture_url: profileData.profile_picture_url || '',
            resume_url: profileData.resume_url || '',
          })
        }
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const uploadProfilePicture = async (file: File) => {
    if (!profile) return
    setUploadingPicture(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}/profile-picture.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('portfolio').getPublicUrl(fileName)

      setFormData((prev) => ({ ...prev, profile_picture_url: publicUrl }))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to upload profile picture')
    } finally {
      setUploadingPicture(false)
    }
  }

  const uploadResume = async (file: File) => {
    if (!profile) return
    setUploadingResume(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}/resume.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('portfolio').getPublicUrl(fileName)

      setFormData((prev) => ({ ...prev, resume_url: publicUrl }))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to upload resume')
    } finally {
      setUploadingResume(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!profile) throw new Error('Profile not found')

      await updateUserProfile(profile.id, {
        full_name: formData.full_name,
        bio: formData.bio,
        profile_picture_url: formData.profile_picture_url,
        resume_url: formData.resume_url,
      })

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your profile information and files</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-700 px-4 py-3 rounded-md">
          Profile updated successfully!
        </div>
      )}

      <Card className="p-6">
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>

          {/* Profile Picture */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Profile Picture</label>
              <p className="text-xs text-muted-foreground">Upload a profile picture (max 5MB)</p>
            </div>

            {formData.profile_picture_url && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                <img
                  src={formData.profile_picture_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadProfilePicture(file)
              }}
              disabled={uploadingPicture}
            />
          </div>

          {/* Resume */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Resume</label>
              <p className="text-xs text-muted-foreground">Upload your resume (PDF, DOCX, etc.)</p>
            </div>

            {formData.resume_url && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <span>✓</span>
                <a
                  href={formData.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Download Resume
                </a>
              </div>
            )}

            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadResume(file)
              }}
              disabled={uploadingResume}
            />
          </div>

          {/* Save Button */}
          <Button type="submit" disabled={saving || uploadingPicture || uploadingResume}>
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
