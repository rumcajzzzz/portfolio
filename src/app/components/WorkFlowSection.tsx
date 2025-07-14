'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

import workflow1 from '@/assets/lottie/workflow1.json';
import workflow2 from '@/assets/lottie/workflow2.json';
import workflow3 from '@/assets/lottie/workflow3.json';
import workflow4 from '@/assets/lottie/workflow4.json';

const workflowAnimations = [
  workflow1,
  workflow2,
  workflow3,
  workflow4,
];


const steps = [
  {
    title: 'Szybki kontakt',
    description:
      'Rozmawiamy krótko i konkretnie – telefonicznie lub mailowo. Od razu pokazuję trafne przykłady dopasowane do Twojej branży.',
  },
  {
    title: 'Dopasowana propozycja',
    description:
      'Na podstawie rozmowy przygotowuję koncepcję strony – estetykę, układ i treści dopasowane do celów Twojej firmy.',
  },
  {
    title: 'Projekt i poprawki',
    description:
      'Tworzę stronę od podstaw. Wprowadzam zmiany na bieżąco, zgodnie z Twoimi uwagami – aż do pełnego zadowolenia.',
  },
  {
    title: 'Publikacja i start',
    description:
      'Pomagam z domeną i uruchomieniem strony. Wszystko działa bez zarzutu – Ty możesz skupić się na biznesie.',
  },
];




export default function WorkFlowSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [stepIndex, setStepIndex] = useState(-1);

  const introHeight = 600;
  const stepHeight = 600;
  const lastStepHeight = 1800;
  const totalSteps = steps.length;
  const sectionHeight = introHeight + stepHeight * (totalSteps - 1) + lastStepHeight;

  useEffect(() => {
    const introHeight = 600;
    const stepHeight = 600;
    const lastStepHeight = 1800;
    const totalSteps = steps.length;
    const sectionHeight = introHeight + stepHeight * (totalSteps - 1) + lastStepHeight;
  
    const handleScroll = () => {
      if (!sectionRef.current) return;
  
      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const relativeScroll = scrollY - sectionTop;
  
      if (relativeScroll >= 0 && relativeScroll < sectionHeight) {
        if (relativeScroll < introHeight) {
          setStepIndex(-1);
        } else if (relativeScroll < introHeight + stepHeight * (totalSteps - 1)) {
          const currentStep = Math.floor((relativeScroll - introHeight) / stepHeight);
          setStepIndex(currentStep);
        } else {
          setStepIndex(totalSteps - 1);
        }
      } else if (relativeScroll < 0) {
        setStepIndex(-1);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <div style={{ height: `${sectionHeight}px` }} ref={sectionRef}>
      <div className="sticky top-0 h-screen w-full bg-black px-4 md:px-6 flex flex-col justify-center items-center">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-16 text-center text-white transition-opacity duration-700 ${
            stepIndex === -1 ? 'opacity-100' : 'opacity-50'
          }`}
        >
          Jak wygląda praca ze mną?
        </h2>

        <div className="w-full max-w-6xl relative h-[500px] md:h-[450px]">
          {steps.map((step, i) => {
            const isActive = i === stepIndex;
            return (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-6 md:gap-12 transition-all duration-700 text-white ${
                  isActive
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : 'opacity-0 -translate-x-20 pointer-events-none'
                }`}
              >
                {/* Tekst */}
                <div className="w-full md:w-1/2 px-4 md:px-8 text-center md:text-left">
                  <div className="text-[80px] md:text-[120px] font-black text-yellow-700 opacity-30 leading-none select-none mb-2">
                    {i + 1}
                  </div>
                  <h3 className="text-xl md:text-3xl font-semibold">{step.title}</h3>
                  <p className="text-md md:text-lg mt-3 text-neutral-400">{step.description}</p>
                </div>

                {/* Animacja Lottie */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 md:px-8">
                  <div className="bg-[#0a0a0a] rounded-lg p-4 shadow-md" style={{ maxHeight: '260px' }}>
                    <Lottie
                      key={isActive ? `active-${i}` : `inactive-${i}`}
                      animationData={workflowAnimations[i]}
                      loop={true}
                      style={{ maxHeight: '220px', width: 'auto' }}
                    />
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
