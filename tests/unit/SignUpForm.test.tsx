import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  validEmail,
  invalidEmail,
  validPassword,
  validNickName,
  invalidNickName,
  invalidPassword,
} from '../__mocks/formdata';
import SignUpForm from '@/components/auth/SignUpForm';

describe('SignUpForm', () => {
  test('rendering test', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/닉네임/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호 확인$/i)).toBeInTheDocument();
  });

  test('update value test', async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement;
    const nicknameInput = screen.getByLabelText(/닉네임/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /비밀번호$/i
    ) as HTMLInputElement;
    const passwordCheckInput = screen.getByLabelText(
      /비밀번호 확인$/i
    ) as HTMLInputElement;

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(nicknameInput, validNickName);
    await userEvent.type(passwordInput, validPassword);
    await userEvent.type(passwordCheckInput, validPassword);

    expect(emailInput.value).toBe(validEmail);
    expect(nicknameInput.value).toBe(validNickName);
    expect(passwordInput.value).toBe(validPassword);
    expect(passwordCheckInput.value).toBe(validPassword);
  });

  test('check invalid input', async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement;
    const nicknameInput = screen.getByLabelText(/닉네임/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /비밀번호/i
    ) as HTMLInputElement;
    const passwordCheckInput = screen.getByLabelText(
      /비밀번호 확인/i
    ) as HTMLInputElement;

    await userEvent.type(emailInput, invalidEmail);
    await userEvent.type(nicknameInput, invalidNickName);
    await userEvent.type(passwordInput, invalidPassword);
    await userEvent.type(passwordCheckInput, validPassword); // Different password

    await waitFor(() => {
      expect(
        screen.getByText(/유효하지 않은 이메일입니다/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/닉네임은 최소 2글자 이상입니다/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/비밀번호는 최소 8자리 이상입니다/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/비밀번호가 일치하지 않습니다/i)
      ).toBeInTheDocument();
    });
  });

  test('check valid input', async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement;
    const nicknameInput = screen.getByLabelText(/닉네임/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /비밀번호/i
    ) as HTMLInputElement;
    const passwordCheckInput = screen.getByLabelText(
      /비밀번호 확인/i
    ) as HTMLInputElement;

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(nicknameInput, validNickName);
    await userEvent.type(passwordInput, validPassword);
    await userEvent.type(passwordCheckInput, validPassword);

    await waitFor(() => {
      expect(
        screen.queryByText(/유효하지 않은 이메일입니다/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/닉네임은 최소 2글자 이상입니다/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/비밀번호는 최소 8자리 이상입니다/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/비밀번호가 일치하지 않습니다/i)
      ).not.toBeInTheDocument();
    });
  });
});
