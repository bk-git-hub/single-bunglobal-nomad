import { Ref } from 'react';

interface AuthPageInputProps {
  errorMsg?: string;
  labelText: string;
  ref: Ref<HTMLInputElement>;
  placeholder?: string;
  id: string;
}

export default function AuthPageInput({
  errorMsg,
  labelText,
  placeholder,
  ref,
  id,
}: AuthPageInputProps) {
  return (
    <div className='w-full relative'>
      <label htmlFor={id}>{labelText}</label>
      <div
        id='wrapper'
        className={`flex items-center justify-between px-5 py-4 border rounded-[6px] focus-within:border-[#79747E] focus-within:outline focus-within:outline-primary ${
          errorMsg !== '' ? 'border-red-500' : 'border-[#79747E]'
        }`}
      >
        <input
          placeholder={placeholder ? placeholder : ''}
          className='focus:outline-none flex-1'
          id={id}
          type='text'
          ref={ref}
        />
      </div>
      {errorMsg !== '' && (
        <p className='absolute top-full left-0 mt-1 text-red-500'>{errorMsg}</p>
      )}
    </div>
  );
}
