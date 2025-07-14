"use client"

import HeroSection from "@/components/HeroSection";
import AboutSection from "./components/AboutSection";
import WorkflowSection from "./components/WorkFlowSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WorkflowSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )

}