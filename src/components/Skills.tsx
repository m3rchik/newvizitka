'use client';

import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { useState } from 'react';

const skills = [
  {
    category: 'Frontend',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    items: [
      { name: 'React', level: 90, details: ['Hooks', 'Context API', 'Redux', 'React Query', 'Performance optimization'] },
      { name: 'Next.js', level: 85, details: ['Server Components', 'App Router', 'API Routes', 'SSR/SSG', 'Middleware'] },
      { name: 'TypeScript', level: 85, details: ['Type Safety', 'Generics', 'Utility Types', 'Advanced Types', 'Decorators'] },
      { name: 'CSS/SCSS', level: 90, details: ['Flexbox', 'Grid', 'Animations', 'Responsive Design', 'CSS-in-JS'] },
      { name: 'Tailwind', level: 95, details: ['Custom Themes', 'Plugins', 'JIT Mode', 'Responsive Utilities'] }
    ]
  },
  {
    category: 'Backend',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
    items: [
      { name: 'Node.js', level: 85, details: ['Express', 'REST APIs', 'WebSockets', 'Authentication', 'Microservices'] },
      { name: 'Python', level: 80, details: ['FastAPI', 'Django', 'Data Processing', 'Async/Await', 'ORM'] },
      { name: 'Databases', level: 85, details: ['PostgreSQL', 'MongoDB', 'Redis', 'Query Optimization', 'Indexing'] },
      { name: 'GraphQL', level: 75, details: ['Apollo', 'Schema Design', 'Resolvers', 'Type Systems'] }
    ]
  },
  {
    category: 'DevOps',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z M8 12h8" />
      </svg>
    ),
    items: [
      { name: 'Docker', level: 80, details: ['Containerization', 'Docker Compose', 'Multi-stage Builds', 'Networking'] },
      { name: 'CI/CD', level: 85, details: ['GitHub Actions', 'Jenkins', 'Automated Testing', 'Deployment Strategies'] },
      { name: 'Cloud', level: 75, details: ['AWS', 'Vercel', 'Serverless', 'Cloud Functions', 'S3/CloudFront'] },
      { name: 'Linux', level: 80, details: ['Shell Scripting', 'System Administration', 'Security', 'Performance Tuning'] }
    ]
  },
  {
    category: 'Инструменты',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    items: [
      { name: 'Git', level: 90, details: ['Version Control', 'Branching Strategies', 'Code Review', 'Git Flow'] },
      { name: 'Testing', level: 85, details: ['Jest', 'React Testing Library', 'Cypress', 'TDD', 'E2E Testing'] },
      { name: 'Performance', level: 80, details: ['Lighthouse', 'Web Vitals', 'Bundle Analysis', 'Optimization'] },
      { name: 'Agile', level: 85, details: ['Scrum', 'Kanban', 'Sprint Planning', 'Code Reviews'] }
    ]
  }
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<{ category: string; skill: string } | null>(null);

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="Мои навыки"
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-gradient"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="glass rounded-2xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-purple-400/80">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-semibold text-gradient">
                  {skillGroup.category}
                </h3>
              </div>

              <div className="space-y-6">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={skillVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onMouseEnter={() => setSelectedSkill({ category: skillGroup.category, skill: skill.name })}
                      onMouseLeave={() => setSelectedSkill(null)}
                    >
                      <span className="text-gray-300/90">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        variants={progressBarVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={skill.level}
                        className="h-full bg-gradient-to-r from-purple-500/80 to-blue-500/80"
                      />
                    </div>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: selectedSkill?.category === skillGroup.category && 
                                selectedSkill?.skill === skill.name ? "auto" : 0,
                        opacity: selectedSkill?.category === skillGroup.category && 
                                selectedSkill?.skill === skill.name ? 1 : 0,
                      }}
                      transition={{
                        height: { duration: 0.2 },
                        opacity: { duration: 0.2 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-1">
                        {skill.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ 
                              opacity: selectedSkill?.category === skillGroup.category && 
                                      selectedSkill?.skill === skill.name ? 1 : 0,
                              x: selectedSkill?.category === skillGroup.category && 
                                 selectedSkill?.skill === skill.name ? 0 : -5
                            }}
                            transition={{
                              duration: 0.2,
                              delay: detailIndex * 0.05
                            }}
                            className="flex items-center gap-2 text-sm text-gray-400"
                          >
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full flex-shrink-0" />
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-gray-300/80">
            Постоянно изучаю новые технологии и следую лучшим практикам разработки.
            Особое внимание уделяю производительности, безопасности и качеству кода.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 