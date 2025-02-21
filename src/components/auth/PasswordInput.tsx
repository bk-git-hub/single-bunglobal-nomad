import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordInputProps {
  errorMsg?: string;
  labelText: string;
  register: UseFormRegisterReturn;
  id: string;
}

export default function PasswordInput({
  errorMsg,
  labelText,
  register,
  id,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className='w-full relative'>
      <label htmlFor={id}>{labelText}</label>
      <div
        id='wrapper'
        className={`flex items-center justify-between px-5 py-4 border rounded-[6px] focus-within:border-[#79747E] focus-within:outline focus-within:outline-primary ${
          errorMsg ? 'border-red-500' : 'border-[#79747E]'
        }`}
      >
        <input
          className='focus:outline-none flex-1'
          id={id}
          type={isVisible ? 'text' : 'password'}
          {...register}
        />
        <button
          type='button'
          onClick={() => setIsVisible((prev) => !prev)}
          tabIndex={-1}
        >
          <Image
            width={24}
            height={24}
            src={isVisible ? '/visibility_off.svg' : '/visibility_on.svg'}
            alt='visibility toggle'
          />
        </button>
      </div>
      {errorMsg && (
        <p className='absolute top-full left-0 mt-1 text-red-500'>{errorMsg}</p>
      )}
    </div>
  );
}
