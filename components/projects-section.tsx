"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Update the projects array with your actual projects
  const projects = [
    {
      title: "Verse Chat",
      description:
        "A real-time messaging application with secure messaging, push notifications, and offline data persistence. Features include group chats, media sharing, and end-to-end encryption.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Flutter", "Hive", "MVVM", "Socket.IO", "Firebase", "Node.js", "MongoDB"],
      github: "https://github.com/prathamsoni11/verse-chat",
      live: "https://prathamsoni.vercel.app/projects/verse-chat",
    },
    {
      title: "Notes App",
      description:
        "A note-taking application with full CRUD operations and persistent storage, following MVVM architecture. Features include categorization, search functionality, and data backup.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Java", "SQLite", "MVVM"],
      github: "https://github.com/prathamsoni11/notes-app",
      live: "https://prathamsoni.vercel.app/projects/notes",
    },
    {
      title: "Microservices Architecture",
      description:
        "A scalable microservices system with service discovery, API gateway, and secure authentication. Implemented with Spring Boot and deployed on AWS infrastructure.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Java", "Spring Boot", "Eureka", "API Gateway", "JWT", "AWS"],
      github: "https://github.com/prathamsoni11/microservices-demo",
      live: "https://prathamsoni.vercel.app/projects/microservices",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features dark mode, animations, and a contact form.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/prathamsoni11/portfolio",
      live: "https://prathamsoni.vercel.app",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="section-padding w-full">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            My <span className="text-primary">Projects</span>
          </h2>
          <div
            className={`h-1 w-20 bg-primary mx-auto rounded-full transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 transform scale-x-100" : "opacity-0 transform scale-x-0"
            }`}
          ></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden transition-all duration-700 hover:shadow-lg ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
