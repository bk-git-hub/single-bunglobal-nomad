import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Global Nomad',
  description: '글로벌 노마드드',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='flex flex-col items-center font-assacom'>
        {children}
      </body>
    </html>
  );
}
