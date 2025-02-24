'use client';

import AuthPageInput from './AuthPageInput';
import PasswordInput from './PasswordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import axiosClient from '@/lib/axiosClient';

const signUpSchema = z
  .object({
    email: z.string().email('유효하지 않은 이메일입니다'),
    nickname: z.string().min(2, '닉네임은 최소 2글자 이상입니다'),
    password: z.string().min(8, '비밀번호는 최소 8자리 이상입니다'),
    passcheck: z.string(),
  })
  .refine((data) => data.password === data.passcheck, {
    message: '비밀번호가 일치하지 않습니다', // Custom error message
    path: ['passcheck'], // Attach the error to the passcheck field
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  const [waiting, setWaiting] = useState(false);

  const onSubmit = async (data: SignUpFormValues) => {
    setWaiting(true);
    try {
      const response = await axiosClient.post('/signup', data);

      if (response.status === 201) {
        console.log('회원가입완료');
      }
    } catch (error) {
      console.log('회원가입 실패', error);
    } finally {
      setWaiting(false);
    }
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
          labelText='이메일'
          idText='email'
          register={register('email')}
          placeholder='example@email.com'
          errorMsg={errors.email ? errors.email.message : ''}
        />
        <AuthPageInput
          labelText='닉네임'
          placeholder='최소 2자 이상 입력바랍니다'
          idText='nickname'
          register={register('nickname')}
          errorMsg={errors.nickname ? errors.nickname.message : ''}
        />
        <PasswordInput
          labelText='비밀번호'
          id='password'
          register={register('password')}
          errorMsg={errors.password ? errors.password.message : ''}
        />
        <PasswordInput
          labelText='비밀번호 확인'
          id='passcheck'
          register={register('passcheck')}
          errorMsg={errors.passcheck ? errors.passcheck.message : ''}
        />
        <button
          type='submit'
          className='mt-7 py-4 bg-primary text-white rounded-[6px] flex items-center justify-center'
        >
          {waiting ? (
            <div className='spinner'></div> // Spinner when waiting
          ) : (
            '회원가입' // Text when not waiting
          )}
        </button>
      </form>

      <div className='flex gap-4 items-center'>
        <span>회원이신가요?</span>
        <Link href={'/signin'} className='underline text-[20px]'>
          로그인하기
        </Link>
      </div>
    </div>
  );
}
