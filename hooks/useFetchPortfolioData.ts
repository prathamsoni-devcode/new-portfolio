'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image_url?: string
  github_url?: string
  live_url?: string
}

interface Experience {
  id: string
  title: string
  company: string
  period: string
  technologies: string[]
  description?: string
}

interface Skill {
  id: string
  category: string
  skill_name: string
  proficiency_level: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/projects')
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, isLoading, error: error ? { message: error } : null }
}

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/experiences')
        if (!response.ok) throw new Error('Failed to fetch experiences')
        const data = await response.json()
        setExperiences(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return { experiences, isLoading, error: error ? { message: error } : null }
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/skills')
        if (!response.ok) throw new Error('Failed to fetch skills')
        const data = await response.json()
        setSkills(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return { skills, isLoading, error: error ? { message: error } : null }
}
