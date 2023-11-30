'use client';
import Sidebar from '@/components/layout/Sidebar';
import SetTheme from '@/components/set-theme';
import React from 'react';
const Layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [collapse, setCollapse] = React.useState(true);
    const [screenWidth, setScreenWidth] = React.useState(0);

    React.useEffect(() => {
        function handleResize() {
            if (collapse && window.innerWidth < 768) {
                setCollapse(false);
            }
        }
        window.addEventListener('resize', handleResize);
    }, []);
    return (
            <main className='relative flex min-h-screen flex-col'>
                <div className="flex-1">
                    <div className="w-full  flex-1 items-start ">
                        <Sidebar
                            collapse={collapse}
                            onToggle={() => {
                                setCollapse(!collapse);
                            }}
                            screenWidth={screenWidth} multiple={false} />
                        <section className={`${collapse ? 'ml-[16rem]' : 'ml-[5rem]'} transition-all ease-in-out duration-[.5s] h-screen`}>
                            <div className="p-5 bg-background">
                                <div className='w-full flex justify-end'>
                                    <SetTheme />
                                </div>
                                <div className="w-full">
                                    {children}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
    );
};

export default Layout;