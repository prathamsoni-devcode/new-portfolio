"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles } from "lucide-react"

export function ExperienceSection() {
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

  // Only showing last 3 experiences
  const experiences = [
    {
      title: "Software Engineer L1",
      company: "ConsultAdd Inc",
      period: "February 2024 - Present",
      technologies: ["Java", "Spring Boot", "AWS", "Microservices", "Next.js", "Flutter"],
    },
    {
      title: "Flutter Developer",
      company: "The Speed Turtle",
      period: "March 2023 - May 2023",
      technologies: ["Flutter", "Dart", "Firebase", "RESTful APIs"],
    },
    {
      title: "Flutter Web Developer",
      company: "The Social Chutney",
      period: "December 2022 - March 2023",
      technologies: ["Flutter Web", "Figma", "Hostinger", "Responsive Design"],
    },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-secondary/30 dark:bg-secondary/10 relative w-full"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/5 rounded-full animate-ping"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-primary mr-2 animate-spin" />
            <h2
              className={`text-3xl md:text-4xl font-bold transition-all duration-700 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
              }`}
            >
              Work{" "}
              <span className="text-primary bg-gradient-to-r from-emerald-600 to-slate-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <Sparkles className="h-6 w-6 text-primary ml-2 animate-spin" style={{ animationDirection: "reverse" }} />
          </div>
          <div
            className={`h-1 w-20 bg-gradient-to-r from-emerald-500 to-slate-500 mx-auto rounded-full transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 transform scale-x-100" : "opacity-0 transform scale-x-0"
            }`}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/60 to-primary/30"></div>

          {/* Glowing effect on timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-slate-400 opacity-50 animate-pulse"></div>

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-12 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              {/* Animated timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transform -translate-x-1/2 mt-6 animate-pulse shadow-lg shadow-primary/50"></div>

              {/* Glowing ring around dot */}
              <div className="absolute left-6 w-6 h-6 border-2 border-primary/30 rounded-full transform -translate-x-1/2 mt-5 animate-ping"></div>

              {/* Content */}
              <div className="ml-12">
                <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary/50 hover:border-l-primary">
                  <CardContent className="p-6 relative overflow-hidden">
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 md:mt-0 bg-secondary/50 px-3 py-1 rounded-full">
                          {exp.period}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                            style={{ animationDelay: `${techIndex * 100}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Call to action for more experience */}
          <div
            className={`text-center mt-12 transition-all duration-700 delay-1000 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-slate-400 rounded-lg blur opacity-30 animate-pulse"></div>
              <Card className="relative bg-gradient-to-r from-primary/10 to-slate-500/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-semibold mb-2">Want to know more about my journey?</h4>
                  <p className="text-muted-foreground mb-4">Discover my complete work history and achievements</p>
                  <Button className="group hover:scale-105 transition-transform duration-300" asChild>
                    <a href="https://pratham-portfolio.s3.ap-south-1.amazonaws.com/Resume-PrathamSoni.pdf" download>
                      <FileText className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                      View Full Resume
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
