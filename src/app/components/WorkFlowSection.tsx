'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { ChevronDown } from 'lucide-react';

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
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const introHeight = 600;
  const stepHeight = 600;
  const lastStepHeight = 1800;
  const totalSteps = steps.length;
  const sectionHeight = introHeight + stepHeight * (totalSteps - 1) + lastStepHeight;
  const canChangeStepRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const relativeScroll = scrollY - sectionTop;

      if (relativeScroll >= 0 && relativeScroll < sectionHeight) {
        let newIndex = -1;

        if (relativeScroll < introHeight) {
          newIndex = -1;
        } else if (relativeScroll < introHeight + stepHeight * (totalSteps - 1)) {
          newIndex = Math.floor((relativeScroll - introHeight) / stepHeight);
        } else {
          newIndex = totalSteps - 1;
        }

        if (newIndex !== stepIndex && canChangeStepRef.current) {
          canChangeStepRef.current = false;
          setStepIndex(newIndex);

          // jeśli osiągnięto ostatni krok, ustawiamy completed
          if (newIndex === totalSteps - 1) {
            setIsCompleted(true);
          }

          // blokada scrolla tylko jeśli animacja nie jest ukończona
          if (!isCompleted) {
            setIsScrollBlocked(true);
            setTimeout(() => {
              setIsScrollBlocked(false);
              canChangeStepRef.current = true;
            }, 1200);
          } else {
            // od razu odblokowujemy, jeśli completed
            canChangeStepRef.current = true;
          }
        }
      } else if (relativeScroll < 0 && stepIndex !== -1) {
        setStepIndex(-1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [stepIndex, isCompleted]);

  useEffect(() => {
    document.body.style.overflow = isScrollBlocked && !isCompleted ? 'hidden' : '';
  }, [isScrollBlocked, isCompleted]);

  return (
    <div style={{ height: `${sectionHeight}px` }} ref={sectionRef}>
      <div className="sticky top-0 h-screen w-full bg-black px-2 sm:px-4 md:px-6 flex flex-col justify-center items-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-10 sm:mb-16 text-center text-white transition-opacity duration-700 ${
            stepIndex === -1 ? 'opacity-100' : 'opacity-50'
          }`}
        >
          Jak wygląda praca ze mną?
        </h2>

        <div className="w-full max-w-5xl relative h-[350px] sm:h-[400px] md:h-[450px]">
          {steps.map((step, i) => {
            const isActive = i === stepIndex;
            return (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 sm:gap-6 md:gap-2 transition-all duration-700 text-white ${
                  isActive
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : 'opacity-0 -translate-x-20 pointer-events-none'
                }`}
              >

                <div className="w-full md:w-1/2 px-2 sm:px-4 md:px-8 text-center md:text-left">
                  <div className="text-[80px] sm:text-[100px] md:text-[120px] font-black text-yellow-700 opacity-30 leading-none select-none mb-1 sm:mb-2 md:translate-y-10 md:-translate-x-5 sm:translate-y-12 sm:-translate-x-38">
                    {i + 1}
                  </div>
                  <h3 className="text-3xl font-semibold">{step.title}</h3>
                  <p className="mx-32 py-6 text-sm sm:text-md md:text-lg mt-2 sm:mt-3 md:mx-0 text-neutral-400">{step.description}</p>
                </div>

                <div className="w-full md:w-1/2 flex justify-center md:justify-end px-2 sm:px-4 md:px-8 ">
                  <div className="bg-[#0a0a0a] rounded-lg p-2 sm:p-4 shadow-md lottie-style max-h-[180px] sm:max-h-[220px]">
                    <Lottie
                      key={isActive ? `active-${i}` : `inactive-${i}`}
                      animationData={workflowAnimations[i]}
                      loop={true}
                      style={{ maxHeight: '180px', width: 'auto' }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {stepIndex === steps.length - 1 && (
          <div className="absolute bottom-10 flex justify-center w-full animate-bounce">
            <button
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
              className="text-white text-3xl opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Przejdź dalej"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
