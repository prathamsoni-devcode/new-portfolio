"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Globe, Layers, Settings, Terminal } from "lucide-react"

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code2 className="h-6 w-6" />,
      skills: ["Java", "Dart", "Kotlin", "SQL"],
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    },
    {
      title: "Frameworks",
      icon: <Layers className="h-6 w-6" />,
      skills: ["Flutter", "Spring Boot"],
      color: "from-teal-500 to-cyan-500",
      bgColor: "from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20",
    },
    {
      title: "Platforms & Cloud",
      icon: <Globe className="h-6 w-6" />,
      skills: ["AWS", "RDS", "AWS Lambda", "AWS S3"],
      color: "from-slate-500 to-gray-500",
      bgColor: "from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
    },
    {
      title: "Tools",
      icon: <Terminal className="h-6 w-6" />,
      skills: ["Git", "GitHub", "AWS", "Docker", "Maven", "Gradle", "Swagger"],
      color: "from-gray-500 to-slate-500",
      bgColor: "from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20",
    },
    {
      title: "AI Integration",
      icon: <Settings className="h-6 w-6" />,
      skills: ["LangChain", "LLM APIs", "Pinecone", "RAG Pipelines"],
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20",
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative w-full">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            My <span className="bg-gradient-to-r from-primary to-slate-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div
            className={`h-1 w-24 bg-gradient-to-r from-primary to-slate-600 mx-auto rounded-full transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 transform scale-x-100" : "opacity-0 transform scale-x-0"
            }`}
          ></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life ✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`group transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 cursor-pointer bg-gradient-to-br ${category.bgColor} border-2 border-transparent hover:border-primary/20 ${
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg group-hover:text-primary transition-colors duration-300">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300 ${hoveredCard === index ? "transform scale-110 rotate-3" : ""}`}
                  >
                    {category.icon}
                  </div>
                  <span className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                    {category.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`px-3 py-2 bg-background/80 backdrop-blur-sm text-foreground rounded-full text-sm font-medium border border-primary/10 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default transform hover:scale-105`}
                      style={{
                        animationDelay: `${skillIndex * 100}ms`,
                        transitionDelay: `${skillIndex * 50}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
