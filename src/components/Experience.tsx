'use client';

import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

const experiences = [
  {
    period: '2024 - Настоящее время',
    role: 'Senior Frontend Developer',
    company: 'Tech Solutions',
    description: 'Разработка и оптимизация высоконагруженных веб-приложений. Внедрение микрофронтендов и современных практик разработки.',
    achievements: [
      'Улучшение производительности на 40%',
      'Внедрение компонентной библиотеки',
      'Менторинг junior разработчиков',
      'Code review и улучшение процессов разработки'
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'GraphQL']
  },
  {
    period: '2022 - 2024',
    role: 'Full Stack Developer',
    company: 'Digital Agency',
    description: 'Полный цикл разработки веб-приложений, от проектирования архитектуры до деплоя.',
    achievements: [
      'Запуск 5+ крупных проектов',
      'Интеграция платежных систем',
      'Оптимизация процессов CI/CD',
      'Разработка API и микросервисов'
    ],
    tech: ['Node.js', 'React', 'PostgreSQL', 'Docker']
  },
  {
    period: '2020 - 2022',
    role: 'Frontend Developer',
    company: 'Startup Inc',
    description: 'Разработка пользовательских интерфейсов и внедрение новых технологий.',
    achievements: [
      'Редизайн основного продукта',
      'Внедрение автоматического тестирования',
      'Оптимизация загрузки приложения',
      'Создание системы аналитики'
    ],
    tech: ['Vue.js', 'Vuex', 'SCSS', 'Jest']
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="Опыт работы"
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-gradient"
        />

        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-purple-500/50" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Точка на линии */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white/10" />

                <div className="flex-1 md:text-right">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    className="glass rounded-2xl p-6 h-full"
                  >
                    <span className="text-sm text-purple-400/80">{exp.period}</span>
                    <h3 className="text-xl font-semibold text-gradient mt-2">{exp.role}</h3>
                    <h4 className="text-gray-300/90 mb-4">{exp.company}</h4>
                    <p className="text-gray-400 mb-4">{exp.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-300/90">Достижения:</h5>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.2 + i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <span className="w-1 h-1 bg-purple-400/50 rounded-full" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300/90"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 