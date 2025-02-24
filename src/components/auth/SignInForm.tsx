'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import PasswordInput from './PasswordInput';
import AuthPageInput from './AuthPageInput';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const signInSchema = z.object({
  email: z.string().email('유효하지 않은 이메일 형식입니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [waiting, setWaiting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    setWaiting(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError('email', {
        message: '이메일또는 비밀번호가 일치하지 않습니다',
      });
      setError('password', { message: ' ' });
    } else {
      router.push('/');
    }
    setWaiting(false);
  };

  return (
    <div className='flex flex-col gap-[40px] items-center max-w-[640px]'>
      <Link href={'/'}>
        <Image
          src={'/GlobalNomadIcon.svg'}
          alt='global nomad'
          width={340}
          height={192}
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-7'
      >
        <AuthPageInput
          placeholder='example@email.com'
          idText='email'
          register={register('email')}
          labelText='이메일'
          errorMsg={errors.email ? errors.email.message : ''}
        />
        <PasswordInput
          errorMsg={errors.password ? errors.password.message : ''}
          labelText='비밀번호'
          register={register('password')}
          id='password'
        />
        <button
          type='submit'
          disabled={waiting}
          className='mt-7 py-4 bg-primary text-white rounded-[6px] flex justify-center items-center'
        >
          {waiting ? (
            <div className='spinner'></div> // Spinner when waiting
          ) : (
            '로그인' // Text when not waiting
          )}
        </button>
      </form>

      <div className='flex gap-4 items-center'>
        <span>회원이 아니신가요?</span>
        <Link href={'/signup'} className='underline text-[20px]'>
          회원가입하기
        </Link>
      </div>
    </div>
  );
}
