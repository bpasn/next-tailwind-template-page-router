import { useStoreMenuRoute } from '@/hook/useStoreMenuRoute';
import { X } from 'lucide-react';
import { useState } from 'react';
import { IRouterMenu } from './IRouterMenu';
import Icon from './Icon';
import Link from 'next/link';
import { useRouter as Navigation } from 'next/navigation';
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
}: SidebarProps) => {
    const {
        toggleMenu,
        toggleSubMenu,
        routes
    } = useStoreMenuRoute();
    const [active, setActive] = useState<string>("");
    const router = useRouter();
    const navigate = useRouter();
    // const generateSublevelMenu = (route: IRouterMenu): React.ReactNode | void => {
    //     console.log({ route });
    //     const handleClickSublevel = (item: IRouterMenu) => {
    //         const a = _dataRoute[_dataRoute.findIndex(d => d === route)];
    //         const b = a.children;
    //         const c = b?.[b?.findIndex(e => e === item)!] as IRouterMenu;
    //         c.expanded = false;
    //         setDataRoute(prv => prv.map(itm => {
    //             if (route.children && route.children.length) {
    //                 return {
    //                     ...itm, children: itm.children?.map((e: IRouterMenu) => {
    //                         if (item !== e && e.expanded) {
    //                             return { ...e, expanded: false };
    //                         } else {
    //                             return e;
    //                         }
    //                     })
    //                 };
    //             }
    //             return {
    //                 ...itm, children: itm.children?.map((e: IRouterMenu) => {
    //                     if (item === e && e.expanded) {
    //                         return { ...e, expanded: true };
    //                     } else {
    //                         return e;
    //                     }
    //                 })
    //             };
    //         }));
    //     };
    //     if (collapse && route.children && route.children.length > 0) {
    //         return (
    //             <ul className={`sublevel-nav
    //             ${_dataRoute.find(item => item === route)?.expanded ? 'h-full open-sublevel-nav' : 'h-0 overflow-hidden translate-y-0 opacity-0'}
    //             `}>
    //                 {route.children.map((child: IRouterMenu) => {
    //                     if (child.children && child.children.length > 0) {
    //                         return (
    //                             <li key={child.label} className='sublevel-nav-item'>
    //                                 <button className={`sublevel-nav-link `} onClick={() => handleClickSublevel(child)}>
    //                                     <Dot size={24} className='sublevel-link-icon' />
    //                                     <span className={`sublevel-link-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
    //                                     {child.children && collapse && (
    //                                         <i className='menu-collapse-icon'>
    //                                             {!child.expanded ? <ChevronDown size={30} /> : <ChevronUp size={30} />}
    //                                         </i>
    //                                     )}
    //                                 </button>
    //                                 {child.children && child.children.length > 0 && (
    //                                     generateSublevelMenu(child)!
    //                                 )}
    //                             </li>
    //                         );
    //                     } else if (!child.children || (child.children && child.children.length === 0)) {
    //                         return (
    //                             <li key={child.label} className='sublevel-nav-item'>
    //                                 <Link href={child.routeLink!} className={`sublevel-nav-link ${child.routeLink === active && 'active-sublevel'}`}>
    //                                     <Dot size={24} className='sublevel-link-icon' />
    //                                     <span className={`sublevel-link-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
    //                                 </Link>

    //                             </li>
    //                         );
    //                     }
    //                 })}
    //             </ul>
    //         );
    //     }
    // };
    // const handleClick = (data: IRouterMenu): void => {

    // };

    const generateSubLevelMenu = (children: IRouterMenu) => {
        return collapse && children.children && children.children.length && (
            <ul className={`sublevel-nav ${children?.expanded ? 'h-full open-sublevel-nav' : 'h-0 overflow-hidden translate-y-0 opacity-0'}`}>
                {children.children.map((child: IRouterMenu) => {
                    if (!child.children || (child.children.length === 0)) {
                        return <li key={child.label} className='sublevel-nav-item'>
                            <button onClick={() => {
                                handleChangeRoute(child.routeLink!);
                            }} className={`sublevel-nav-link ${router.pathname.substring(1).startsWith(child.routeLink!.substring(1)) && 'active-sublevel'}`}>
                                <Icon name="Dot" size={24} className='sublevel-link-icon' />
                                <span className={`sublevel-link-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
                            </button>
                        </li>;
                    }
                    if (child.children && child.children.length > 0) {
                        return (
                            <li key={child.label} className='sublevel-nav-item'>
                                <label className={`sublevel-nav-link `} onClick={() => {
                                    toggleSubMenu(child, children);
                                }}>
                                    <Icon name='Dot' size={24} className='sublevel-link-icon' />
                                    <span className={`sublevel-link-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
                                    {child.children && collapse && (
                                        <i className='menu-collapse-icon'>
                                            {!child.expanded ? <Icon name='ChevronDown' size={30} /> : <Icon name='ChevronUp' size={30} />}
                                        </i>
                                    )}
                                </label>
                                {child.children && child.children.length > 0 && (
                                    <div>
                                        {generateSubLevelMenu(child)!}
                                    </div>
                                )}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        );
    };
    const handleChangeRoute = (route: string) => router.push(route);
    const generateMenu = () => routes.map(child => {
        if (child.children?.length) {
            return (
                <li key={child.label} >
                    <label className='nav-router-link' onClick={() => toggleMenu(child)}>
                        {child.icon && <Icon name={child.icon} className='nav-link-menu-item-icon' size={30} />}
                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
                        {child.children && collapse && (
                            <i className='ml-auto'>
                                {!child.expanded ? <Icon name="ChevronDown" size={30} /> : <Icon name="ChevronUp" size={30} />}
                            </i>
                        )}
                    </label>
                    {child.children && child.children.length > 0 && (
                        <div >
                            {generateSubLevelMenu(child)}
                        </div>
                    )}
                </li>
            );
        }
        return (
            <li key={child.label}>
                <button onClick={() => {
                    handleChangeRoute(child.routeLink!);
                }} className={`nav-router-link ${router.pathname.substring(1).startsWith(child.routeLink!.substring(1)) && 'active'}`}>
                    {child.icon && <Icon name={child.icon} size={30} className='text-primary-50' />}
                    <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{child.label}</span>
                </button>
            </li>
        );
    });

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
                    {generateMenu()}
                    {/* {_dataRoute.map((route: IRouterMenu) => {
                        if (!route.children || (route.children && route.children.length === 0)) {
                            return (
                                <li key={route.label}>
                                    <Link href={route.routeLink!} className={`nav-router-link ${router.pathname.substring(1).startsWith(route.routeLink!) && 'active'}`}>
                                        {route.icon && <route.icon size={30} className='text-primary-50' />}
                                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{route.label}</span>
                                    </Link>
                                </li>
                            );
                        } else if (route.children && route.children.length) {
                            return (
                                <li key={route.label} className=''>
                                    <button className="nav-router-link" onClick={() => handleClick(route)}>
                                        {route.icon && <route.icon className='nav-link-menu-item-icon' size={30} />}
                                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{route.label}</span>
                                        {route.children && collapse && (
                                            <i className='ml-auto'>
                                                {!route.expanded ? <ChevronDown size={30} /> : <ChevronUp size={30} />}
                                            </i>
                                        )}
                                    </button>
                                    {route.children && route.children.length > 0 && (
                                        generateSublevelMenu(route)!
                                    )}
                                </li>
                            );
                        }
                    })} */}
                </ul>
            </div>

        </aside>
    );
};

export default Sidebar;;