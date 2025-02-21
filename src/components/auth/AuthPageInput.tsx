import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthPageInputProps {
  errorMsg?: string;
  labelText: string;
  placeholder?: string;
  idText: string;
  register: UseFormRegisterReturn;
}

export default function AuthPageInput({
  errorMsg,
  labelText,
  placeholder,
  idText,
  register,
}: AuthPageInputProps) {
  return (
    <div className='w-full relative'>
      <label htmlFor={idText}>{labelText}</label>
      <div
        className={`flex items-center justify-between px-5 py-4 border rounded-[6px] focus-within:border-[#79747E] focus-within:outline focus-within:outline-primary ${
          errorMsg ? 'border-red-500' : 'border-[#79747E]'
        }`}
      >
        <input
          placeholder={placeholder ? placeholder : ''}
          className='focus:outline-none flex-1'
          id={idText}
          type='text'
          {...register}
        />
      </div>
      {errorMsg !== '' && (
        <p className='absolute top-full left-0 mt-1 text-red-500'>{errorMsg}</p>
      )}
    </div>
  );
}
