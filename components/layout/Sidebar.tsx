'use client';
import { useStoreMenuRoute } from '@/hook/useStoreMenuRoute';
import { X } from 'lucide-react';
import { Menu } from './Menu';
import React from 'react';
interface SidebarProps {
    collapse: boolean;
    screenWidth: number;
    multiple: boolean;
    onToggle: () => void;
}
const Sidebar = () => {
    const {
        routes
    } = useStoreMenuRoute();
    const { collapse, setCollapse } = useStoreMenuRoute();
    React.useEffect(() => {
        function handleResize() {
            if (collapse && window.innerWidth < 768) {
                setCollapse(false);
            }
        }
        window.addEventListener('resize', handleResize);
    }, []);
    return (
        <aside className={`sidebar-container ${collapse ? 'w-[16rem]' : 'w-[5rem]'}`}>
            <div className="sidebar-content">
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

        </aside>
    );
};
export default Sidebar;;