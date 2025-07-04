"use client"

import { motion } from "framer-motion"
import type { PortfolioData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SplineScene from "@/components/spline-scene"

interface ProjectsSectionProps {
  data: PortfolioData
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const { projects } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden">
      {/* Full-screen Spline background */}
      <SplineScene
        scene="https://prod.spline.design/Sjj7TaP7KI7zAN-m/scene.splinecode"
        className="absolute inset-0"
        style={{ opacity: 1 }}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12"
        >
          Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white">
                <CardHeader>
                  {/*<Image*/}
                  {/*  src={project.imageUrl}*/}
                  {/*  alt={project.title}*/}
                  {/*  width={400}*/}
                  {/*  height={200}*/}
                  {/*  className="w-full h-48 object-cover rounded-t-lg"*/}
                  {/*/>*/}
                  <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
                  <p className="text-sm text-white/70">{project.category} | {project.duration}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.description.map((desc, i) => (
                      <p key={i} className="text-sm text-white/90 leading-relaxed">{desc}</p>
                    ))}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-white/20 px-2 py-1 rounded text-xs text-white/90">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
