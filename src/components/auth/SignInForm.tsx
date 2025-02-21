'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          type='text'
          {...register('email')}
          placeholder='example@email.com'
        ></input>
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor='email'>비밀번호</label>
        <input id='password' type='password' {...register('password')}></input>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type='submit'>로그인</button>
    </form>
  );
}
