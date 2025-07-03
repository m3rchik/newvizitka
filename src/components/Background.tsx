'use client';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/newvizitka/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/30 to-black" />
    </div>
  );
} 