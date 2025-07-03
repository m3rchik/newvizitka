import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <div className="min-h-screen" />,
});

const Skills = dynamic(() => import('@/components/Skills'), {
  loading: () => <div className="min-h-screen" />,
});

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div className="min-h-screen" />,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="min-h-screen" />,
});

const Experience = dynamic(() => import('@/components/Experience'), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  return (
    <>
      <section id="hero" data-animate>
        <Hero />
      </section>
      
      <section id="skills" data-animate>
        <Skills />
      </section>
      
      <section id="experience" data-animate>
        <Experience />
      </section>
      
      <section id="projects" data-animate>
        <Projects />
      </section>
      
      <section id="contact" data-animate>
        <Contact />
      </section>
    </>
  );
} 