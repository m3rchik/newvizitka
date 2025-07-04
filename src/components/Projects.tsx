'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from './AnimatedText';
import imageLoader from '@/utils/imageLoader';

const projects = [
  {
    title: 'Портфолио видеомонтажера',
    description: 'Персональный сайт-портфолио с современным дизайном и анимациями. Разработан на Next.js с использованием TypeScript и Tailwind CSS.',
    image: '/newvizitka/projects/kamilvizitka.jpg',
    github: 'https://github.com/m3rchik/kamilvizitka',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    preview: 'kamilvizitka.vercel.app'
  },
  {
    title: 'Article Website',
    description: 'Веб-приложение для управления статьями с использованием Flask. Включает функционал просмотра, добавления и редактирования статей.',
    image: '/newvizitka/projects/article.jpg',
    github: 'https://github.com/m3rchik/second-project',
    technologies: ['Python', 'Flask', 'SQLite', 'HTML/CSS'],
    preview: null
  },
  {
    title: 'Skupka Project',
    description: 'Веб-сайт для сервиса скупки с адаптивным дизайном и интерактивными элементами.',
    image: '/newvizitka/projects/skupka.jpg',
    github: 'https://github.com/m3rchik/skupka',
    technologies: ['HTML', 'Python', 'CSS', 'JavaScript'],
    preview: null
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="Мои проекты"
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-gradient"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  loader={imageLoader}
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gradient">{project.title}</h3>
                <p className="text-gray-300/90 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300/90 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  {project.preview && (
                    <a
                      href={`https://${project.preview}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-300/90 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Демо
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 