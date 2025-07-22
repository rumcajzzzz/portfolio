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

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from<'projects', Project>('projects')
        .select('*')
        .order('sort_order', { ascending: true })

      setProjects(data ?? [])
    }

    fetchProjects()
  }, [])

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
