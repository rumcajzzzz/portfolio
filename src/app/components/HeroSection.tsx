'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

const words = [
  'uniwersalne.', 
  'nowoczesne.',
  'czytelne.',
  'funkcjonalne.',
  'szybkie.',
  'dopasowane.',
  'efektywne.', 
  'estetyczne.'
];

function TypewriterText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <h2 className="text-2xl md:text-4xl font-semibold text-center mt-4">
      <span className="inline-block border-r-2 border-white pr-1 animate-pulse">
        {displayedText}
      </span>
    </h2>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[60vh] w-full flex flex-col justify-start items-center text-white px-4 overflow-hidden pt-[40vh]">

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          className={clsx(
            'text-xl md:text-2xl font-400 mb-6 transition-opacity duration-1000',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          Cześć, mam na imię <span className="font-change">Marcel</span> {/* Marcel  */} i tworzę strony, które są
          <TypewriterText />
        </h1>

      </div>
      
    </section>
  );
}