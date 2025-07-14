'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FadeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const standardElements = document.querySelectorAll('.fade-in-on-scroll');
    const softElements = document.querySelectorAll('.fade-in-on-scroll-soft');

    const standardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            standardObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const softObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            softObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.2,
      }
    );

    standardElements.forEach((el) => standardObserver.observe(el));
    softElements.forEach((el) => softObserver.observe(el));

    return () => {
      standardObserver.disconnect();
      softObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
