'use client';
import Sidebar from '@/components/layout/Sidebar';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }: {
    children: React.ReactNode;
}) => {
    const [collapse, setCollapse] = useState(true);
    const [screenWidth, setScreenWidth] = useState(0);


    useEffect(() => {
        function handleResize() {
            if (collapse && window.innerWidth < 768) {
                setCollapse(false);
            }
        }
        window.addEventListener('resize', handleResize);
    }, []);
    return (
        <main className='w-screen h-screen relative'>
            <Sidebar
                collapse={collapse}
                onToggle={() => {
                    console.log(collapse);
                    setCollapse(!collapse);
                } }
                screenWidth={screenWidth} multiple={false} />
            <section className={`${collapse ? 'ml-[16rem]' : 'ml-[5rem]'} transition-all ease-in-out duration-[.5s]`}>
                {children}
            </section>
        </main>
    );
};

export default Layout;