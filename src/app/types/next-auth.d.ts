import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      name: string;
      image: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    image: string;
  }
}
