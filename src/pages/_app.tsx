'use client';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';
import Layout from './layout';
import ThemeProvider from '@/components/theme-provider';
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
function Auth({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=Authorization');
    }
  });
  if (status === 'loading') {
    return "loading";
  }

  return children;
}