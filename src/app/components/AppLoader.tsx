'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FadeObserver from './FadeObserver';
export default function AppLoader({ children }: { children: React.ReactNode }) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(false), 1);
		return () => clearTimeout(timer);
	}, []);

	if (visible) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 opacity-100 animate-fadeOut">
				<Image
					src="/rumcajzlogo.svg"
					alt="Logo Rumcajz"
					width={120}
					height={120}
					className="animate-pulse"
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
