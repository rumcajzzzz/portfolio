'use client'

import Image from 'next/image'
import { Project } from '@/lib//types'
import { useEffect } from 'react'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
 
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [projects]) 

  if (!projects.length) {
    return <p>Brak projektów do wyświetlenia.</p>
  }

  return (
    <section
      id="projects"
      className="w-full px-6 py-24 flex flex-col items-center max-w-7xl mx-auto"
    >

      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
        Moje Projekty
      </h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {projects.slice().reverse().map(({ id, title, description, image_url, project_url }) => (
          <a
            key={id}
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-neutral-700 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 fade-in-on-scroll"
          >
            <div className="h-48 w-full relative ">
              <Image
                src={image_url}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-80 duration-300 transition-all"
                priority={false}
              />
            </div>

            <div className="p-4 bg-neutral-900">
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              <p className="text-sm text-neutral-400 mb-2">{description}</p>
            </div>
          </a>
        ))}
      </div>

    </section>
  )
}
