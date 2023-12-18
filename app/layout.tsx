import { Suspense } from 'react';
import '../styles/globals.scss';
import { LoadingProvider } from '@/provider/LoadingProvider';
import AuthProvider from '@/provider/auth-provider';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOption } from './api/auth/[...nextauth]/authOption';
const Layout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await getServerSession(authOption);
    return (
        <html lang="en">
            <body>
                <AuthProvider session={session}>
                    <Suspense fallback={<LoadingProvider />}>
                        {children}
                    </Suspense>
                </AuthProvider>
            </body>
        </html>
    );
};

export default Layout;