/* eslint-disable react/destructuring-assignment */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

import { AuthContext } from 'store/auth';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

type HeaderProps = {
  children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <header
    sx={{
      py: 3,
      px: 4,
      bg: '#f4f4f2',
    }}
  >
    {children}
  </header>
);

export const AuthLayout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
}) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!authCtx?.isLoggedIn) {
      router.replace('/');
    } else {
      setIsMounted(true);
    }
  }, [authCtx?.isLoggedIn, router]);

  if (!isMounted) {
    return (
      <p
        sx={{
          variant: 'text.h3',
          position: 'absolute',
          top: '40%',
          left: '50%',
          translate: '-50% -50%',
        }}
      >
        Loading...
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description || 'Generated by create next app'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main sx={{ height: '100vh' }}>{children}</main>
    </>
  );
};
