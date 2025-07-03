'use client';

import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        loader={imageLoader}
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover opacity-50"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/30 to-black" />
    </div>
  );
} 