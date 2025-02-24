import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import UserProfileDropdown from '../ui/dropdown/UserProfileDropdown';
import Image from 'next/image';
import Link from 'next/link';

export default async function Header() {
  const session = await getServerSession(authOptions);
  if (session) console.log(session);
  return (
    <header className='flex w-full items-center justify-between max-w-[1200px] p-5'>
      <Image
        src={'/HeaderLogo.svg'}
        width={160}
        height={28}
        alt='global nomad'
      />

      {!session ? (
        <div className='flex gap-6'>
          <Link href={'/signin'}>로그인</Link>

          <Link href={'/signup'}>회원가입</Link>
        </div>
      ) : (
        <UserProfileDropdown {...session.user} />
      )}
    </header>
  );
}
