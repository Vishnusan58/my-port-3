"use client"

import { motion } from "framer-motion"
import type { PortfolioData } from "@/lib/data"
import SplineScene from "@/components/spline-scene"

interface SkillsSectionProps {
  data: PortfolioData
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  const { coreCompetencies, programmingLanguages, certifications } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
        delay: 0.2,
      },
    },
  }

  return (
    <motion.section
      id="skills"
      className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Full-screen Spline background */}
      <SplineScene
        scene="https://prod.spline.design/LIrGzewCup0HAAvF/scene.splinecode"
        className="absolute inset-0"
        style={{ opacity: 1 }}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.4,
          }}
          className="text-5xl font-bold mb-12"
        >
          Skills & Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold mb-6">Core Competencies</h3>
            <ul className="list-disc list-inside space-y-2 text-lg text-white/90">
              {coreCompetencies.map((skill, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold mb-6">Programming Languages</h3>
            <ul className="list-disc list-inside space-y-2 text-lg text-white/90">
              {programmingLanguages.map((lang, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-3xl font-bold mb-6">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 p-4 rounded-lg shadow-md backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <p className="text-lg text-white/90">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
