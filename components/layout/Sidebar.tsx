'use client';
import { useStoreMenuRoute } from '@/hook/useStoreMenuRoute';
import { X } from 'lucide-react';
import { Menu } from './Menu';
interface SidebarProps {
    collapse: boolean;
    screenWidth: number;
    multiple: boolean;
    onToggle: () => void;
}
const Sidebar = ({
    collapse,
    onToggle,
}: SidebarProps) => {
    const {
        routes
    } = useStoreMenuRoute();
    return (
        <aside className={`sidebar-container ${collapse ? 'w-[16rem]' : 'w-[5rem]'}`}>
            <div className="sidebar-content">
                <div className="logo-container">
                    <button className="logo" onClick={onToggle}>N</button>
                    <span className={`logo-text ${collapse ? 'block' : 'hidden'}`}>Next tailwind</span>
                    <button
                        onClick={onToggle}
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