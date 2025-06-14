"use client"

import { Button } from "@/components/ui/button"
import { Download, Send, Code, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden pt-16 w-full">
      {/* Enhanced background with mouse-following effect */}
      <div className="absolute inset-0 z-0 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950 opacity-70"></div>

        {/* Animated background blobs - constrained to viewport */}
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-600 dark:to-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-slate-400 to-gray-400 dark:from-slate-600 dark:to-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-teal-300 to-emerald-300 dark:from-teal-700 dark:to-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Mouse follower effect - only on larger screens */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-slate-400/10 rounded-full filter blur-3xl pointer-events-none transition-all duration-1000 ease-out hidden md:block"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        {/* Floating particles - constrained positioning */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-slate-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Animated greeting */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <div className="flex items-center justify-center mb-4 flex-wrap gap-2">
              <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-spin" />
              <span className="text-base sm:text-lg text-muted-foreground font-medium">Hello World! I'm</span>
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-800 bg-clip-text text-transparent animate-pulse break-words">
              Pratham Soni
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-slate-600 bg-clip-text text-transparent px-2 sm:px-6 py-2 mb-6 break-words">
              Software Engineer & AWS Certified Solutions Architect
            </h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Passionate about crafting <span className="text-primary font-semibold">scalable applications</span> and
              building the future with <span className="text-slate-600 font-semibold">cutting-edge technologies</span>.
              Let's create something amazing together! ✨
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 transition-all duration-1000 delay-700 px-4 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              asChild
            >
              <a href="#contact">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:animate-pulse" />
                Hire Me
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              asChild
            >
              <a href="https://pratham-portfolio.s3.ap-south-1.amazonaws.com/Resume-PrathamSoni.pdf" download>
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Floating scroll indicator */}
          <div
            className={`mt-12 sm:mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              <a
                href="#about"
                className="relative inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce"
                onClick={(e) => {
                  e.preventDefault()
                  const aboutSection = document.getElementById("about")
                  if (aboutSection) {
                    aboutSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <span className="sr-only">Scroll down</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
