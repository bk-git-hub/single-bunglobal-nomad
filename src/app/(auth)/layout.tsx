import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Nomad/로그인',
  description: '글로벌 노마드 로그인',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='my-24'>{children}</div>;
}
