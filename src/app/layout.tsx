import type { Metadata } from 'next';
import './styles/css/global.css';

export const metadata: Metadata = {
	title: 'To Do App'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
