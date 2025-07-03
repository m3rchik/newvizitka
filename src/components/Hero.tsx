'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

const stats = [
  { icon: '/file.svg', text: '5+ лет опыта', subtext: 'в разработке' },
  { icon: '/globe.svg', text: '10+ проектов', subtext: 'успешно завершено' },
  { icon: '/window.svg', text: 'Современный стек', subtext: 'технологий' },
  { icon: '/vercel.svg', text: 'Оптимизация', subtext: 'и производительность' }
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'
];

function CodeComment({ text, delay, position = 'left' }: { text: string; delay: number; position?: 'left' | 'right' }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, started]);

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`absolute ${position === 'left' ? '-left-32' : '-right-32'} transform ${position === 'left' ? '-translate-x-full' : 'translate-x-full'} font-mono text-sm text-gray-400/80`}
      style={{ maxWidth: '250px', top: position === 'left' ? '0' : '2rem' }}
    >
      <span className="text-gray-500/70">{'//'}</span> {displayText}
    </motion.div>
  );
}

function TypewriterText() {
  const texts = [
    "Привет, я Fullstack разработчик",
    "Создаю современные веб-приложения с помощью React и Next.js"
  ];
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentTextIndex >= texts.length) return;

    const currentText = texts[currentTextIndex];
    if (currentCharIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentText[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (currentTextIndex < texts.length - 1) {
      const lineBreakTimeout = setTimeout(() => {
        setDisplayText(prev => prev + '\n');
        setCurrentTextIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 500);

      return () => clearTimeout(lineBreakTimeout);
    }
  }, [currentTextIndex, currentCharIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="space-y-4">
      {displayText.split('\n').map((line, index) => (
        <div 
          key={index} 
          className={`${index === 0 ? 'text-4xl md:text-6xl font-bold' : 'text-xl md:text-2xl'} ${
            index === 0 ? 'text-white' : 'text-gray-300/90'
          }`}
        >
          {line}
          {index === displayText.split('\n').length - 1 && (
            <span 
              className={`text-purple-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'opacity 0.1s' }}
            >
              |
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const codeStrings = [
  `function createMagic() {
    return "✨".repeat(3);
  }`,
  `const developer = {
    code: () => magic,
    coffee: true
  };`,
  `while(coding) {
    drinkCoffee();
    writeCode();
  }`
];

// Отдельный компонент для анимированного кода
function AnimatedCode() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  
  const codeLines = useMemo(() => [
    'const magic = "✨";',
    'function dev() { return "🚀"; }',
    'while(true) { code(); }'
  ], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-purple-400/10"
          initial={{ opacity: 0, y: -100 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: ['0%', '100%']
          }}
          transition={{
            duration: 10,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
          style={{
            left: `${30 + i * 20}%`,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-50"
        animate={{ 
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </motion.svg>
    </motion.div>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const animations = useMemo(() => ({
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: "easeOut" }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    },
    tech: (i: number) => ({
      initial: { opacity: 0, scale: 0.8, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  }), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Базовая разметка для серверного рендеринга
  const content = (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative">
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center space-y-8 relative">
          <div className="relative py-8">
            <TypewriterText />
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#projects" className="glass px-8 py-3 rounded-full text-sm md:text-base">
              Мои проекты
            </a>
            <a href="#contact" className="glass px-8 py-3 rounded-full text-sm md:text-base">
              Связаться со мной
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div key={index} className="glass p-6 rounded-xl text-center">
              <div className="relative w-12 h-12 mx-auto mb-4">
                <Image
                  src={item.icon}
                  alt={item.text}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gradient mb-2">{item.text}</h3>
              <p className="text-sm text-gray-300/80">{item.subtext}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold text-gradient">Основные технологии</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span key={tech} className="glass px-4 py-2 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // Если компонент не смонтирован, возвращаем базовую разметку
  if (!mounted) {
    return content;
  }

  // После монтирования возвращаем анимированную версию
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative">
      {mounted && !prefersReducedMotion && <AnimatedCode />}
      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-1">
        <motion.div 
          className="text-center space-y-8 relative"
          {...animations.container}
        >
          <div className="relative py-8">
            {mounted && !prefersReducedMotion && (
              <>
                <CodeComment 
                  text="Инициализация основного компонента..." 
                  delay={0}
                  position="left"
                />
                <CodeComment 
                  text="Загрузка профиля разработчика" 
                  delay={1500}
                  position="right"
                />
                <CodeComment 
                  text="const developer = new FullstackDev();" 
                  delay={3000}
                  position="left"
                />
                <CodeComment 
                  text="developer.startCoding() 🚀" 
                  delay={4500}
                  position="right"
                />
              </>
            )}
            <TypewriterText />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <motion.a
              href="#projects"
              className="glass px-8 py-3 rounded-full text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Мои проекты
            </motion.a>
            <motion.a
              href="#contact"
              className="glass px-8 py-3 rounded-full text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Связаться со мной
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={animations.item}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl text-center group"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -5 }}
            >
              <div className="relative w-12 h-12 mx-auto mb-4">
                <Image
                  src={item.icon}
                  alt={item.text}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-gradient mb-2">{item.text}</h3>
              <p className="text-sm text-gray-300/80">{item.subtext}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <h2 className="text-xl font-semibold text-gradient">Основные технологии</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                custom={index}
                variants={animations.tech(index)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="glass px-4 py-2 rounded-full text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
      {mounted && !prefersReducedMotion && <ScrollIndicator />}
    </section>
  );
} 