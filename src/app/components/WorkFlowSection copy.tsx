'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  { title: 'Brief', description: 'Zbieram od Ciebie wszystkie wymagania i pomysły.' },
  { title: 'Planowanie', description: 'Tworzę plan działania i szkic projektu.' },
  { title: 'Projektowanie', description: 'Robię wizualizację i prototyp.' },
  { title: 'Development', description: 'Koduję i wdrażam projekt.' },
  { title: 'Testy i poprawki', description: 'Sprawdzam, poprawiam i dopracowuję.' },
  { title: 'Publikacja', description: 'Oddaję gotowy projekt i pomagam uruchomić.' },
];

export default function WorkFlowSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const positions = [
    { x: 80, y: 60 },
    { x: 80, y: 180 },
    { x: 80, y: 300 },
    { x: 80, y: 420 },
    { x: 80, y: 540 },
    { x: 80, y: 660 },
  ];

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const triggerPoint = windowHeight * 0.75;
      const scrollY = triggerPoint - rect.top;
      const progress = Math.min(Math.max(scrollY / triggerPoint, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden px-6 flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
        Jak wygląda praca ze mną?
      </h2>

      <div className="relative w-full max-w-xl h-[750px]">
        <svg
          width="100"
          height="750"
          viewBox="20 -60 100 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-[40px]"
        >
          <path
            ref={pathRef}
            d="M 50 10 
              C 50 50, 50 150, 50 190
              S 50 330, 50 370
              S 50 510, 50 550
              S 50 690, 50 730"
            stroke="#facc15"
            strokeWidth="3"
            fill="none"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - scrollProgress)}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />

        </svg>

        {steps.map((step, i) => {
          const visible = scrollProgress >= (i + 1) / steps.length;
          return (
            <div
              key={i}
              className={`absolute transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ top: positions[i].y, left: positions[i].x + 80 }}
            >
              <div className="absolute -left-20 top-0 text-[100px] font-black text-yellow-700 opacity-10 leading-none select-none">
                {i + 1}
              </div>

              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-neutral-400 text-sm mt-1 max-w-xs">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
