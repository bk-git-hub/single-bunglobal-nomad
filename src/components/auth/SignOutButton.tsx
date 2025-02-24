'use client';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signin' })}
      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
    >
      로그아웃
    </button>
  );
}
