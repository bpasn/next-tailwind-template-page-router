import { Suspense } from 'react';
import '../styles/globals.scss';
import { LoadingProvider } from '@/provider/LoadingProvider';
const Layout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <html lang="en">
            <body>
                <Suspense fallback={<LoadingProvider />}>
                    {children}
                </Suspense>
            </body>
        </html>
    );
};

export default Layout;