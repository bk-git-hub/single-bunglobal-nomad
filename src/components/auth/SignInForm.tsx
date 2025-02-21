'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

const signInSchema = z.object({
  email: z.string().email('유효하지 않은 이메일 형식입니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log('Form data:', data);
    reset();
  };

  return (
    <div className='flex flex-col gap-[40px] items-center w-[640px]'>
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
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor='email'>이메일</label>
          <input
            id='email'
            type='text'
            {...register('email')}
            placeholder='example@email.com'
            className={`px-5 py-4 border rounded-[6px] focus:outline-none focus:outline-primary ${
              errors.email ? 'border-red-500' : 'border-[#79747E]'
            }`}
          />
          {errors.email && (
            <p className='absolute top-full left-0 mt-1 text-red-500'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-1 relative mt-6'>
          <label htmlFor='password'>비밀번호</label>
          <input
            id='password'
            type='password'
            {...register('password')}
            className={`px-5 py-4 border rounded-[6px] focus:outline-primary ${
              errors.password ? 'border-red-500' : 'border-[#79747E]'
            }`}
          />
          {errors.password && (
            <p className='absolute top-full left-0 mt-1  text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='mt-7 py-4 bg-primary text-white rounded-[6px]'
        >
          로그인
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
