'use client';

import { useEffect, useState } from 'react';

const words = ['versatile.', 'minimal.', 'clean.'];

export default function TypewriterText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 80 : 100;
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && displayedText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 500);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentWord.slice(0, displayedText.length - 1)
          : currentWord.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <h1 className="text-xl md:text-4xl font-bold text-center mt-6">
      <span className="inline-block border-r-2 border-white pr-1 animate-pulse">
        {displayedText}
      </span>
    </h1>
  );
}
