import Image from 'next/image';
import { useState, Ref } from 'react';

interface PasswordInputProps {
  errors: { password?: { message?: string } };
  labelText: string;
  ref: Ref<HTMLInputElement>;
  id: string;
}

export default function PasswordInput({
  errors,
  labelText,
  ref,
  id,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className='w-full relative'>
      <label htmlFor={id}>{labelText}</label>
      <div
        id='wrapper'
        className={`flex items-center justify-between px-5 py-4 border rounded-[6px] focus-within:border-[#79747E] focus-within:outline focus-within:outline-primary ${
          errors.password ? 'border-red-500' : 'border-[#79747E]'
        }`}
      >
        <input
          className='focus:outline-none flex-1'
          id={id}
          type={isVisible ? 'text' : 'password'}
          ref={ref}
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
      {errors.password && (
        <p className='absolute top-full left-0 mt-1 text-red-500'>
          {errors.password.message}
        </p>
      )}
    </div>
  );
}
