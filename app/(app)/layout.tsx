'use client';
import Sidebar from '@/components/layout/Sidebar';
import SetTheme from '@/components/setTheme';
import { useStoreRoute } from '@/hook/useStoreRoute';
import { AlertProvider } from '@/provider/alert-provider';
import ThemeProvider from '@/provider/theme-provider';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const { collapse } = useStoreRoute();
    const storeRoute = useStoreRoute();
    const pathName = usePathname();
    useEffect(() => {
        setIsMounted(true);
        if (collapse && storeRoute.screenWidth < 768) {
            storeRoute.setCollapse(false);
        }
    }, [pathName, storeRoute.screenWidth]);
    if (!isMounted) return null;
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className='relative flex min-h-screen flex-col'>
                <div className="flex-1">
                    <div className="w-full  flex-1 items-start ">
                        <Sidebar />
                        <section className={`${collapse ? 'md:ml-[16rem]' : 'md:ml-[5rem]'} ml-0 transition-all ease-in-out duration-500 h-screen`}>
                            <div className="p-5 bg-background">
                                <div className='w-full hidden justify-end md:flex'>
                                    <SetTheme />
                                </div>
                                <div className="w-full">
                                    <AlertProvider />
                                    {children}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </ThemeProvider>
    );
};

export default Layout;