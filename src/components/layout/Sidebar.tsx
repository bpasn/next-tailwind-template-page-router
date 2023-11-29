import { useStoreMenuRoute } from '@/hook/useStoreMenuRoute';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IRouterMenu } from './IRouterMenu';
import Icon from './Icon';
import { useRouter as Navigation } from 'next/navigation';
import { useRouter } from 'next/router';
import { Menu } from './Menu';
interface SidebarProps {
    collapse: boolean;
    screenWidth: number;
    multiple: boolean;
    onToggle: () => void;
}
const Sidebar = ({
    collapse,
    screenWidth,
    onToggle,
}: SidebarProps) => {
    const {
        routes
    } = useStoreMenuRoute();
    return (
        <aside className={`sidebar-container ${collapse ? 'w-[16rem]' : 'w-[5rem]'}`}>
            <div className="h-full px-3 py-4 overflow-y-auto bg-primary-800">
                <div className="logo-container mb-10">
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