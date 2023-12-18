'use client';
import { useStoreRoute } from '@/hook/useStoreRoute';
import { X } from 'lucide-react';
import React from 'react';
import SetTheme from '../setTheme';
import { Menu } from './Menu';
interface SidebarProps {
    collapse: boolean;
    screenWidth: number;
    multiple: boolean;
    onToggle: () => void;
}
const Sidebar = () => {
    const {
        routes
    } = useStoreRoute();
    const { collapse, setCollapse, setScreenWidth } = useStoreRoute();
    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                setCollapse(false);
            }
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    }, []);
    return (
        <aside className={`sidebar-container`}>
            <div className={`sidebar-content h-[calc(100vh-3.5rem)] hidden md:block ${collapse ? 'w-[16rem]' : 'w-[5rem]'}`}>
                <div className="logo-container">
                    <button className="logo" onClick={() => setCollapse(!collapse)}>N</button>
                    <span className={`logo-text ${collapse ? 'block' : 'hidden'}`}>Next tailwind</span>
                    <button
                        onClick={() => setCollapse(!collapse)}
                        className={`btn-close ${collapse ? 'block' : 'hidden'}`}
                    >
                        <X className='text-primary-50 text-end hover:duration-500' />
                    </button>
                </div>
                <Menu menuItems={routes} collapse={collapse} />
            </div>
            <div className="flex md:hidden p-2">
                <div className="logo-container">
                    <button className="logo" onClick={() => setCollapse(!collapse)}>N</button>
                </div>
                <SetTheme />
                <div className={`md:hidden block sidebar-content  ${collapse ? 'w-3/4' : 'w-0 opacity-0'} `}>
                    <div className="logo-container p-2">
                        <span className={`logo-text ${collapse ? 'block' : 'hidden'}`}>Next tailwind</span>
                        <button
                            onClick={() => {
                                setCollapse(!collapse);
                            }}
                            className={`btn-close ${collapse ? 'block' : 'hidden'}`}
                        >
                            <X className='text-primary-50 text-end hover:duration-500' />
                        </button>
                    </div>
                    {collapse && <Menu menuItems={routes} collapse={collapse} />}
                </div>
            </div>

        </aside>
    );
};
export default Sidebar;;