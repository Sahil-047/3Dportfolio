import React, { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  name: string;
  type: string;
  link: string;
  image: string;
  description?: string;
}

export const projects: Project[] = [
  {
    name: "Sabzee",
    type: "Full Stack AI powered Web ",
    link: "https://portfolio-3d.vercel.app",
    image: "/images/project1.png",
    description: "A modern portfolio website built with Next.js, Three.js, and Framer Motion"
  },
  {
    name: "Notion clone",
    type: "Full Stack Application",
    link: "https://ai-platform.demo",
    image: "/images/project3.png",
    description: "AI-powered content generation platform with real-time collaboration"
  },
  {
    name: "Employee management system",
    type: "Full Stack Web Application",
    link: "https://ecommerce-store.demo",
    image: "/images/project2.png",
    description: "Modern e-commerce platform with 3D product visualization"
  }
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 }); // Start offscreen
  const animationRef = useRef<number | undefined>(undefined);
  const titleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(() => {
        setMousePos({ x: clientX, y: clientY });
        animationRef.current = undefined;
      });
    }
  };

  // Clean up the animation frame
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.querySelector('h2'),
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section className="relative w-full bg-[black] py-24 mt-32 overflow-hidden" id='projects'>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
        <div ref={titleRef} className="mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white-50 font-bold tracking-tighter">
            Featured Work
          </h2>
        </div>

        <div className="grid grid-cols-1">
          {projects.map((project) => (
            <a
              href={project.link}
              key={project.name}
              className="group relative border-t border-[#333333] last:border-b w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="py-6 sm:py-8 md:py-12 relative">
                <div
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onMouseMove={handleMouseMove}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white-50 transition-colors duration-700 group-hover:text-white">
                    {project.name}
                  </h3>
                  <span className="text-sm sm:text-base text-[#666666]">
                    {project.type}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {hoveredProject === project.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut"
                        }
                      }}
                      exit={{ 
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                          ease: "easeIn"
                        }
                      }}
                      className="fixed pointer-events-none z-[9999]"
                      style={{
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        width: 'min(320px, 80vw)',
                        height: 'min(200px, 50vw)',
                      }}
                    >
                      <motion.div 
                        className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl"
                        initial={{ scale: 0.9 }}
                        animate={{ 
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                          }
                        }}
                        exit={{ scale: 0.9 }}
                      >
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center mt-16 sm:mt-20">
          <Button 
            text="view all projects" 
            id="button"
            className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;