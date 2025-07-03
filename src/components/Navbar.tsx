'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '#hero', label: 'Главная' },
  { href: '#skills', label: 'Навыки' },
  { href: '#experience', label: 'Опыт' },
  { href: '#projects', label: 'Проекты' },
  { href: '#contact', label: 'Контакты' }
];

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathVariants: Variants = {
    initial: { 
      pathLength: 0,
      opacity: 0.6
    },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1
        },
        opacity: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    }
  };

  const containerVariants: Variants = {
    initial: { 
      scale: 1,
      rotate: 0 
    },
    animate: { 
      scale: isHovered ? 1.1 : 1,
      rotate: isHovered ? 180 : 0,
      transition: { 
        duration: 0.6,
        ease: [0.6, 0.01, -0.05, 0.95],
        scale: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    }
  };

  const gradientVariants: Variants = {
    initial: {
      backgroundPosition: "0% 50%"
    },
    animate: {
      backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  if (!mounted) {
    return (
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-2 text-white"
          >
            <path
              d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 3V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 7.5L20 16.5M20 7.5L4 16.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="relative w-10 h-10"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="absolute inset-0 rounded-lg"
        variants={gradientVariants}
        initial="initial"
        animate="animate"
        style={{
          background: "linear-gradient(90deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 50%, rgb(168, 85, 247) 100%)",
          backgroundSize: "200% 100%"
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-2 text-white"
        >
          <motion.path
            d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M12 3V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M4 7.5L20 16.5M20 7.5L4 16.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="#hero" className="block">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="block"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300/90 hover:text-white"
                >
                  {link.label}
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.button
            type="button"
            className="md:hidden text-gray-300/90 hover:text-white"
            aria-label="Открыть меню"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-current"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </nav>
    </header>
  );
} 