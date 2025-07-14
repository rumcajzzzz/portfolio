'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FadeObserver from './FadeObserver';

export default function AppLoader({ children }: { children: React.ReactNode }) {
	const [visible, setVisible] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
		const removeTimer = setTimeout(() => setVisible(false), 1800);

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(removeTimer);
		};
	}, []);

	if (visible) {
		return (
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-300 ${
					fadeOut ? 'opacity-0' : 'opacity-100'
				}`}
			>
				<Image
					src="/rumcajzlogo.svg"
					alt="Logo Rumcajz"
					width={120}
					height={120}
					className="animate-pulse invert"
				/>
			</div>
		);
	}

	return (
		<>
			<FadeObserver />
			{children}
		</>
	);
}
