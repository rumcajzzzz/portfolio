import { supabase } from '@/lib/supabaseClient'
import { Project } from '@/lib/types'

import HeroSection from "@/components/HeroSection"
import AboutSection from "./components/AboutSection"
import WorkflowSection from "./components/WorkFlowSection"
import ProjectsSection from "./components/ProjectsSection"
import ContactSection from "./components/ContactSection"

export const revalidate = 0

export default async function Home() {
  const { data, error } = await supabase
    .from<Project>('projects')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    return <p>Błąd ładowania projektów: {error.message}</p>
  }
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WorkflowSection />
      <ProjectsSection projects={data ?? []} />
      <ContactSection />
    </main>
  )
}
