"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Code, Briefcase, Award, Heart, Coffee, Rocket } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

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

  const stats = [
    {
      icon: <Code className="h-6 w-6" />,
      value: "5+",
      label: "Years Coding",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      value: "3+",
      label: "Years Experience",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-500/10",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "10+",
      label: "Projects Completed",
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-500/10",
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 right-20 h-8 w-8 text-pink-400/20 animate-pulse" />
        <Coffee className="absolute bottom-32 left-16 h-6 w-6 text-amber-400/20 animate-bounce" />
        <Rocket className="absolute top-1/2 right-1/4 h-10 w-10 text-emerald-400/20 animate-ping" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            About{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-slate-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div
            className={`h-1 w-20 bg-gradient-to-r from-emerald-500 to-slate-500 mx-auto rounded-full transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 transform scale-x-100" : "opacity-0 transform scale-x-0"
            }`}
          ></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-slate-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/pratham-profile.png"
                  alt="Pratham Soni"
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          <div
            className={`md:col-span-2 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-10"
            }`}
          >
            <Card className="mb-6 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-l-4 border-l-primary/50 hover:border-l-primary">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mr-4 group-hover:scale-110 transition-transform duration-300">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      Professional Summary
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Experienced Software Engineer skilled in building{" "}
                    <span className="text-primary font-semibold">scalable applications</span> using Java, Spring Boot,
                    and MySQL, with hands-on expertise in Flutter for cross-platform development. Proficient in AWS
                    services including EC2, Lambda, S3, RDS, Cognito, and more as a{" "}
                    <span className="text-slate-600 font-semibold">certified AWS Solutions Architect Associate</span>.
                  </p>
                  <p className="text-muted-foreground">
                    Familiar with <span className="text-emerald-600 font-semibold">microservices architecture</span>,
                    Docker, Terraform, and frontend frameworks like Next.js and React.js. Strong knowledge of Firebase,
                    MongoDB, PostgreSQL, and Redis, with a solid foundation in CI/CD, Agile, and modern development
                    practices. 🚀
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <CardContent className="p-4 text-center relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10">
                      <div
                        className={`flex justify-center mb-3 transition-all duration-300 ${hoveredStat === index ? "scale-125" : ""}`}
                      >
                        <div
                          className={`p-3 rounded-full bg-gradient-to-r ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        >
                          <div className="text-white">{stat.icon}</div>
                        </div>
                      </div>
                      <div
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent transition-all duration-300 ${hoveredStat === index ? "scale-110" : ""}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
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
