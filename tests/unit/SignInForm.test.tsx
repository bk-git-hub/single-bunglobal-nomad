import SignInForm from '@/components/auth/SignInForm';
import { render, screen } from '@testing-library/react';

describe('SignInForm', () => {
  test('rendering test', () => {
    render(<SignInForm />);

    expect(screen.getByText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });
});
