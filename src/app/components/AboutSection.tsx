'use client';

import { FaLaptopCode, FaMobileAlt, FaRocket } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';
import Particles from './Particles';

const services = [
  {
    icon: <FaLaptopCode className="text-white text-2xl" />,
    title: 'Strony internetowe',
    desc: 'Tworzę strony, które są szybkie, funkcjonalne i dobrze zaprojektowane.',
  },
  {
    icon: <MdDesignServices className="text-white text-2xl" />,
    title: 'Projekt UX/UI',
    desc: 'Projektuję przejrzyste i nowoczesne interfejsy, dopasowane do odbiorcy.',
  },
  {
    icon: <FaMobileAlt className="text-white text-2xl" />,
    title: 'Responsywność',
    desc: 'Twoja strona działa płynnie na komputerach i telefonach.',
  },
  {
    icon: <FaRocket className="text-white text-2xl" />,
    title: 'Optymalizacja',
    desc: 'Dbam o szybkość ładowania i dobre wyniki w wyszukiwarkach.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full h-screen px-6 py-24 flex flex-col items-center justify-center overflow-hidden"
    >

      {/* TŁO Z PARTICLES */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-60"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%)',
        }}
        >
        <Particles
          particleColors={['#ffffff']}
          particleCount={500}
          particleSpread={10}
          speed={0.03}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* TREŚĆ */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 z-10 fade-in-on-scroll">
        Czym się zajmuję?
      </h2>
      <p className="max-w-xl text-center text-neutral-400 mb-12 fade-in-on-scroll">
        Pomagam firmom i osobom prywatnym tworzyć nowoczesne, szybkie i responsywne strony, które przyciągają uwagę i są proste w obsłudze.
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl w-full z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 border border-neutral-800 rounded-xl hover:bg-neutral-900 transition-colors fade-in-on-scroll"
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="mt-1">{service.icon}</div>
            <div>
              <h3 className="text-lg font-semibold mb-1 relative inline-block pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:rounded-full after:bg-gradient-to-r after:to-white">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-400">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>


    </section>
  );
}
