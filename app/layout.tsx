import '../styles/globals.scss';
const Layout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
};

export default Layout;