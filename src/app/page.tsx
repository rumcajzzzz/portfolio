"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Project } from "@/lib/types"

import HeroSection from "@/components/HeroSection"
import AboutSection from "./components/AboutSection"
import WorkflowSection from "./components/WorkFlowSection"
import ProjectsSection from "./components/ProjectsSection"
import ContactSection from "./components/ContactSection"

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from<'projects', Project>('projects')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      setProjects(data ?? [])
      setLoading(false)
    }

    fetchProjects()
  }, [])

  if (loading) return <p>Ładowanie projektów...</p>
  if (error) return <p>Błąd ładowania projektów: {error}</p>

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WorkflowSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </main>
  )
}
