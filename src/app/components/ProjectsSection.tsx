'use client';

import Image from "next/image";

const projects = [
	{
	  title: 'VetShop - Sklep zoologiczny',
	  description: 'Responsywna strona sklepu zoologicznego z intuicyjnym designem i prostą nawigacją.',
	  imageUrl: '/vet-shop.png',
	  projectUrl: 'https://vetshop-service.netlify.app',
	},
	{
	  title: 'IT Service Shop',
	  description: 'Platforma usług IT z nowoczesnym UI i łatwym dostępem do informacji.',
	  imageUrl: '/it-shop.png',
	  projectUrl: 'https://it-service-shop.netlify.app',
	},
	{
	  title: 'Hairdresser Service',
	  description: 'Strona dla salonu fryzjerskiego z systemem rezerwacji i responsywnym designem.',
	  imageUrl: '/hairdresser-shop.png',
	  projectUrl: 'https://hairdresser-service.netlify.app',
	},
	{
	  title: 'Car Mechanic Shop',
	  description: 'Serwis mechaniczny z intuicyjnym interfejsem i szybką prezentacją usług.',
	  imageUrl: '/auto-shop.png',
	  projectUrl: 'https://car-mechanic-shop.netlify.app',
	},
	{
		title: 'Pizzeria',
		description: 'Smakowita strona pizzerii z menu, danymi kontaktowymi i nowoczesnym wyglądem.',
		imageUrl: '/pizza-shop.png',
		projectUrl: 'https://pizzashoprumcajsdev.netlify.app',
	  },
  ];
  

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full px-6 py-24 flex flex-col items-center max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
        Moje Projekty
      </h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full fade-in-on-scroll">
        {projects.map(({ title, description, imageUrl, projectUrl}, i) => (
          <a
            key={i}
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-neutral-700 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="h-48 w-full relative overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-80 duration-300 transition-all"
                priority={false}
              />
            </div>

            <div className="p-4 bg-neutral-900">
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              <p className="text-sm text-neutral-400 mb-2">{description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
