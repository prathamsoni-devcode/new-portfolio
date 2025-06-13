import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ResumePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Pratham Soni - Resume</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>Email: pratham1108soni@gmail.com</p>
          <p>Phone: +91-9079843800</p>
          <p>Location: Pune, India</p>
          <p>LinkedIn: linkedin.com/in/prathamsoni11</p>
          <p>GitHub: github.com/prathamsoni11</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
          <p>
            Experienced Software Engineer skilled in building scalable applications using Java, Spring Boot, and MySQL,
            with hands-on expertise in Flutter for cross-platform development. Proficient in AWS services including EC2,
            Lambda, S3, RDS, Cognito, and more as a certified AWS Solutions Architect Associate. Familiar with
            microservices architecture, Docker, Terraform, and frontend frameworks like Next.js and React.js. Strong
            knowledge of Firebase, MongoDB, PostgreSQL, and Redis, with a solid foundation in CI/CD, Agile, and modern
            development practices.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <div className="mb-4">
            <h3 className="font-medium">Software Engineer L1 - ConsultAdd Inc, Pune</h3>
            <p className="text-sm text-muted-foreground">February 2024 - Present</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Developed and maintained scalable microservices architecture using Java, Spring Boot, and MySQL</li>
              <li>Designed and implemented RESTful client services, API Gateway, and Eureka Server</li>
              <li>Deployed and managed cloud infrastructure on AWS as a certified AWS Solutions Architect Associate</li>
              <li>Implemented AWS Cognito for user authentication and authorization</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-medium">Flutter Developer - The Speed Turtle, Remote</h3>
            <p className="text-sm text-muted-foreground">March 2023 - May 2023</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Built and maintained a Flutter application targeting Android and iOS</li>
              <li>Integrated Cloud Firestore, Firebase Cloud Functions, and RESTful APIs</li>
              <li>Implemented state management, bug fixes, and feature enhancements</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-5">
            <li>Programming Languages: Java, Dart, JavaScript, TypeScript, Python, HTML, CSS</li>
            <li>Frameworks & Libraries: Flutter, React, Node.js, Express.js, Spring Boot</li>
            <li>Databases: MySQL, PostgreSQL, MongoDB, Firebase</li>
            <li>Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Git</li>
            <li>Other: RESTful APIs, GraphQL, Microservices, Agile/Scrum</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Certifications</h2>
          <ul className="list-disc pl-5">
            <li>AWS Certified Solutions Architect - Associate</li>
            <li>Flutter Development Bootcamp</li>
            <li>Java SE 11 Developer</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <p>
            <strong>Arya College of Engineering Jaipur, India</strong>
          </p>
          <p>Bachelor of Technology, Computer Science - (8.3 CGPA)</p>
          <p className="text-sm text-muted-foreground">September 2020 - July 2024</p>
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
