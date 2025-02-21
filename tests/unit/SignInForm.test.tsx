import SignInForm from '@/components/auth/SignInForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { validEmail, invalidEmail, validPassword } from '../__mocks/formdata';

describe('SignInForm', () => {
  test('rendering test', () => {
    render(<SignInForm />);

    expect(screen.getByText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  test('updates email and password field on user input', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /비밀번호/i
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(emailInput.value).toBe(validEmail);
    expect(passwordInput.value).toBe(validPassword);
  });

  test('displays error message for invalid inputs', async () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement;

    const submitButton = screen.getByRole('button', { name: /로그인/i });

    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/유효하지 않은 이메일 형식입니다/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/비밀번호를 입력해주세요/i)).toBeInTheDocument();
    });
  });

  test('valid inputs should allow form submission', async () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /비밀번호/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /로그인/i });

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPassword } });

    expect(emailInput.value).toBe(validEmail); // Verify input change
    expect(passwordInput.value).toBe(validPassword);

    fireEvent.click(submitButton);

    await waitFor(() => {
      // Ensure that no validation error messages appear
      expect(
        screen.queryByText(/유효하지 않은 이메일 형식입니다/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/비밀번호를 입력해주세요/i)
      ).not.toBeInTheDocument();
    });

    // Optional: Check console output if needed
  });
});
