'use client';

import { useEffect, useState, useCallback } from 'react';

const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];

export default function ScrollManager() {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToSection = useCallback((index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  }, []);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isScrolling) {
              setActiveSection(index);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );

      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isScrolling]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const currentSection = document.getElementById(sections[activeSection]);
      
      if (!currentSection) return;
      
      // Определяем направление прокрутки
      const direction = e.deltaY > 0 ? 'down' : 'up';
      setScrollDirection(direction);

      // Проверяем, находимся ли мы в начале или конце текущей секции
      const sectionTop = currentSection.offsetTop;
      const sectionBottom = sectionTop + currentSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      const buffer = 50; // Буферная зона в пикселях

      // Разрешаем обычную прокрутку внутри секции
      if (
        (direction === 'down' && currentScrollY + viewportHeight < sectionBottom - buffer) ||
        (direction === 'up' && currentScrollY > sectionTop + buffer)
      ) {
        return;
      }

      // Предотвращаем слишком частую смену секций
      if (now - lastScrollTime < 1000 || isScrolling) return;
      
      e.preventDefault();
      setLastScrollTime(now);
      setLastScrollY(currentScrollY);

      if (direction === 'down' && activeSection < sections.length - 1) {
        scrollToSection(activeSection + 1);
      } else if (direction === 'up' && activeSection > 0) {
        scrollToSection(activeSection - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 1000 || isScrolling) return;
      setLastScrollTime(now);

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && activeSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(activeSection + 1);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && activeSection > 0) {
        e.preventDefault();
        scrollToSection(activeSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, isScrolling, lastScrollTime, scrollToSection, lastScrollY, scrollDirection]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 space-y-2">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => {
            if (!isScrolling) {
              scrollToSection(index);
            }
          }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === index
              ? 'bg-purple-500 scale-125'
              : 'bg-white/20 hover:bg-white/40'
          }`}
          aria-label={`Перейти к секции ${section}`}
        />
      ))}
    </div>
  );
} 