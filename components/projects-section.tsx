"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Loader2 } from "lucide-react"
import Image from "next/image"
import { useProjects } from "@/hooks/useFetchPortfolioData"

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { projects, isLoading, error } = useProjects()

  // Fallback projects if database is not set up
  const fallbackProjects = [
    {
      id: 1,
      title: "Uber Spring Boot App",
      description:
        "Designed a ride-booking backend system implementing strategy patterns for driver allocation and fare calculation. Features geospatial queries with PostGIS for proximity-based driver matching and JWT-based authentication.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Spring Boot", "Postgres", "PostGIS", "JWT"],
      github_url: "https://github.com/prathamsoni11",
      live_url: "",
    },
  ]

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects

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

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load projects</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <Card
              key={project.id || index}
              className={`overflow-hidden transition-all duration-700 hover:shadow-lg ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {project.image_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {project.github_url && (
                  <Button variant="outline" size="sm" className="gap-2" asChild>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.live_url && (
                  <Button size="sm" className="gap-2" asChild>
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
