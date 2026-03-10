'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProjects() {
  const { data, error, isLoading } = useSWR('/api/projects', fetcher)
  return {
    projects: data || [],
    isLoading,
    error,
  }
}

export function useExperiences() {
  const { data, error, isLoading } = useSWR('/api/experiences', fetcher)
  return {
    experiences: data || [],
    isLoading,
    error,
  }
}

export function useSkills() {
  const { data, error, isLoading } = useSWR('/api/skills', fetcher)
  return {
    skills: data || [],
    isLoading,
    error,
  }
}
