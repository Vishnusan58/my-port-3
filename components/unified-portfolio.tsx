"use client";

import { motion, Variants } from "framer-motion";
import { cubicBezier } from "framer-motion/dom";
import { useEffect, useState } from "react";
import type { PortfolioData } from "@/lib/data";
import SplineScene from "./spline-scene";

interface UnifiedPortfolioProps {
  data: PortfolioData;
}

export default function UnifiedPortfolio({ data }: UnifiedPortfolioProps) {
  const {
    name,
    tagline,
    aboutHeading,
    aboutContent,
    education,
    professionalExperience,
    projects,
    coreCompetencies,
    programmingLanguages,
    certifications,
    contact,
    cvUrl,
  } = data;

  // Track which section is active for background changing
  const [, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const observers = new Map();
    const sections = ["hero", "about", "experience", "skills", "projects", "contact"];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px",
    });

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        observers.set(sectionId, observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  };

  return (
    <div className="relative">
      {/* Fixed position Spline background with your new scene URL */}
      <div className="fixed inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/80wLvPTypnaWjxMy/scene.splinecode"
          className="absolute inset-0"
          style={{ opacity: 1 }}
        />
        {/* Dark overlay for contrast - reduced opacity for better visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 text-white">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
          <div className="text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold mb-4"
            >
              {name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl max-w-2xl mx-auto"
            >
              {tagline}
            </motion.p>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
          aria-label="About section"
          tabIndex={0}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, ease: cubicBezier(0.25, 0.1, 0.25, 1), delay: 0.1 }}
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
                {education && education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="mb-4 bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm border border-white/20"
                  >
                    <p className="text-xl font-semibold">{edu.institution}</p>
                    <p className="text-lg text-white/90">{edu.degree}</p>
                    <p className="text-md text-white/70">
                      {edu.duration} | {edu.location}
                    </p>
                    {edu.details && edu.details.map((detail, i) => (
                      <p key={i} className="text-md text-white/70">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-12"
            >
              Experience
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-8"
            >
              {professionalExperience && professionalExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="mb-8 bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm border border-white/20 text-left"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.role}</h3>
                      <p className="text-xl text-white/90">{exp.company}</p>
                    </div>
                    <p className="text-lg text-white/70 mt-2 md:mt-0">
                      {exp.duration} | {exp.location}
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.description && exp.description.map((item, i) => (
                      <li key={i} className="text-white/90">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: cubicBezier(0.25, 0.1, 0.25, 1), delay: 0.4 }}
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
                  {coreCompetencies && coreCompetencies.map((skill, index) => (
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
                  {programmingLanguages && programmingLanguages.map((lang, index) => (
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
                {certifications && certifications.map((cert, index) => (
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
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-12"
            >
              Projects
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects && projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-white/70">{project.category} | {project.duration}</p>
                    <div className="mt-4 space-y-4">
                      {project.description && project.description.map((desc, i) => (
                        <p key={i} className="text-sm text-white/90 leading-relaxed">{desc}</p>
                      ))}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies && project.technologies.map((tech, i) => (
                          <span key={i} className="bg-white/20 px-2 py-1 rounded text-xs text-white/90">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-12"
            >
              Get In Touch
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {contact && contact.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                      {item.icon && <item.icon className="w-8 h-8 text-white" />}
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                        {item.href ? (
                          <a href={item.href} className="text-white/90 hover:text-white transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white/90">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-3 text-lg font-semibold rounded inline-block transition-all duration-300"
              >
                Download CV
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
