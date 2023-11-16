import Sidebar from '@/components/layout/Sidebar';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }: {
    children: React.ReactNode;
}) => {
    const [collapse, setCollapse] = useState(true);
    const [multiple, setMultiple] = useState(false);
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
                multiple
                onToggle={() => setCollapse(!collapse)}
                screenWidth={screenWidth} />
            <section className={
                `${collapse ? 'w-[16rem]' : 'w-[5rem]'}`
            }>
                {children}
            </section>
        </main>
    );
};

export default Layout;