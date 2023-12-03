import LoadingProvider from '@/provider/loading-provider';
import ThemeProvider from '@/provider/theme-provider';
import '@/styles/globals.scss';
const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;