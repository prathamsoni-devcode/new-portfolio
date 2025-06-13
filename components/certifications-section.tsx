"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

export function CertificationsSection() {
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

  const certifications = [
    {
      title: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SAA",
    },
  ]

  return (
    <section id="certifications" ref={sectionRef} className="section-padding bg-secondary/30 dark:bg-secondary/10">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <span className="text-primary">Certifications</span>
          </h2>
          <div
            className={`h-1 w-20 bg-primary mx-auto rounded-full transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 transform scale-x-100" : "opacity-0 transform scale-x-0"
            }`}
          ></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="transition-all duration-500"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Award className="h-5 w-5 mr-2 text-primary" />
                      {cert.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary font-medium">{cert.issuer}</p>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Issued: {cert.date}</span>
                      <span>ID: {cert.credentialId}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
