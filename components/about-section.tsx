"use client"

import { motion } from "framer-motion"
import type { PortfolioData } from "@/lib/data"
import SplineScene from "@/components/spline-scene"

interface AboutSectionProps {
  data: PortfolioData
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { education, aboutHeading, aboutContent } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <motion.section
      id="about"
      className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
      aria-label="About section"
      tabIndex={0}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Full-screen Spline background */}
      <SplineScene
        scene="https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode"
        className="absolute inset-0"
        style={{ opacity: 1 }}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="text-5xl font-bold mb-12"
        >
          {aboutHeading || "About"}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
            aria-label="Profile image section"
          >
            {/*<Image*/}
            {/*  src={profilePicture || "/placeholder.svg"}*/}
            {/*  alt={name ? `${name}'s profile picture` : "Profile picture"}*/}
            {/*  width={200}*/}
            {/*  height={200}*/}
            {/*  className="rounded-full mx-auto object-cover border-4 border-white shadow-xl"*/}
            {/*  priority*/}
            {/*  sizes="(max-width: 768px) 150px, 200px"*/}
            {/*  onError={(e) => {*/}
            {/*    e.currentTarget.src = "/placeholder.svg";*/}
            {/*  }}*/}
            {/*/>*/}
          </motion.div>
          {aboutContent && aboutContent.map((text, idx) => (
            <motion.p
              key={idx}
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-3xl font-bold mb-6">Education</h3>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-4 bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm border border-white/20"
              >
                <p className="text-xl font-semibold text-white">{edu.institution}</p>
                <p className="text-lg text-white/90">{edu.degree}</p>
                <p className="text-md text-white/70">
                  {edu.duration} | {edu.location}
                </p>
                {edu.details.map((detail, i) => (
                  <p key={i} className="text-md text-white/70">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

