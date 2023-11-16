import { ChevronDown, ChevronUp, Dot, X } from 'lucide-react';
import { dataRoute } from './dataRoute';
import Link from 'next/link';
import { IRouterMenu } from './IRouterMenu';
import { useState } from 'react';
import { useRouter } from 'next/router';
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
    multiple = false
}: SidebarProps) => {
    const [active,setActive] = useState<string>(dataRoute[0].label)

    const router = useRouter();

    const generateSublevelMenu = (route: IRouterMenu, expanded: boolean): React.ReactNode | void => {
        const handleClickSublevel = (item:IRouterMenu) => {
            if (!multiple) {
                if (route.children && route.children.length > 0) {
                  for (let modelChild of route.children) {
                    if (item !== modelChild && modelChild.expanded) {
                      modelChild.expanded = false;
                    }
                  }
                }
              }
              item.expanded = !item.expanded
        }
        if (collapse && route.children && route.children.length > 0) {
            return (
                <ul className={`sublevel-nav
                ${expanded ? 'h-full ' : 'h-0 overflow-hidden'}
                `}>
                    {route.children.map((child: IRouterMenu) => {
                        if (child.children && child.children.length > 0) {
                            return (
                                <li key={child.label} className='sublevel-nav-item'>
                                    <Link href={""} className={`sublevel-nav-link`} onClick={() => handleClickSublevel(child)}>
                                        <Dot size={24} className='sublevel-link-icon' />
                                        <span className={`sublevel-link-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
                                        {child.children && collapse && (
                                            <i className='menu-collapse-icon'>
                                                {!child.expanded ? <ChevronDown size={30} /> : <ChevronUp size={30} />}
                                            </i>
                                        )}
                                    </Link>
                                    {child.children && child.children.length > 0 && (
                                        generateSublevelMenu(child, child.expanded!)!
                                    )}
                                </li>
                            );
                        } else if (!child.children || (child.children && child.children.length === 0)) {
                            return (
                                <li key={child.label} className='sublevel-nav-item'>
                                    <Link href={child.routeLink!} className={`sublevel-nav-link ${child.routeLink === active && 'active-sublevel'}`}>
                                        <Dot size={24} className='sublevel-link-icon' />
                                        <span className={`sublevel-link-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
                                    </Link>

                                </li>
                            );
                        }
                    })}
                </ul>
            );
        }
    };
    const handleClick = (data: IRouterMenu):void => {
        if(!multiple) {
            for(let child of dataRoute){
                if(data !== child && child.expanded){
                    child.expanded = false;
                }
            }
        }
        data.expanded = !data.expanded;
    };

    const handleChangeRoute = (data:IRouterMenu) => {
        console.log(router.pathname)
    }
    console.log()
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
                <ul className="nav-menu">
                    {dataRoute.map((route: IRouterMenu) => {
                        if (!route.children || (route.children && route.children.length === 0)) {
                            return (
                                <li key={route.label}>
                                    <Link href={route.routeLink!} className={`nav-router-link ${router.pathname.substring(1).startsWith(route.routeLink!) && 'active'}`} onClick={() => handleChangeRoute(route)}>
                                        {route.icon && <route.icon size={30} className='text-primary-50' />}
                                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{route.label}</span>
                                    </Link>
                                </li>
                            );
                        } else if (route.children && route.children.length) {
                            return (
                                <li key={route.label}>
                                    <Link href={""} className="nav-router-link" onClick={() => handleClick(route)}>
                                        {route.icon && <route.icon className='nav-link-menu-item-icon' size={30} />}
                                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{route.label}</span>
                                        {route.children && collapse && (
                                            <i className='ml-auto'>
                                                {!route.expanded ? <ChevronDown /> : <ChevronUp />}
                                            </i>
                                        )}
                                    </Link>
                                    {route.children && route.children.length > 0 && (
                                        generateSublevelMenu(route, route.expanded!)!
                                    )}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>

        </aside>
    );
};

export default Sidebar;