'use client';
import { useStoreRoute } from "@/hook/useStoreRoute";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IRouterMenu } from "./IRouterMenu";
import Icon from "./Icon";


export const MenuItem = ({ item, collapse }: { item: IRouterMenu; collapse: boolean; }) => {
    const [expanded, setExpanded] = useState(item.expanded || false);
    const storeRoute = useStoreRoute();
    const pathname = usePathname();
    const handleToggle = () => {
        if(!storeRoute.collapse && storeRoute.screenWidth > 768) {
            storeRoute.setCollapse(true);
            if(!expanded){
                setExpanded(true)
            }
        }else {
            setExpanded(!expanded);
        }
    };
    const router = useRouter();
    const changeRoute = (route: string) => {
        router.push(route);
    };
    return (
        <li>
            {item.routeLink ? (
                <button onClick={() => changeRoute(item.routeLink!)} className={`nav-router-link ${pathname.substring(1) === (item.routeLink!.substring(1)) && 'active'} ${!collapse && "justify-center"}`}>
                    {item.icon && <Icon name={item.icon} size={30} className={`sublevel-link-icon`} />}
                    <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{item.label}</span>
                </button>
            ) : (
                <div onClick={handleToggle}>
                    <button className={`nav-router-link ${!collapse && "justify-center"}`}>
                        {item.icon && <Icon name={item.icon} className='sublevel-link-icon' size={30} />}
                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{item.label}</span>
                        {item.children && collapse && (
                            <i className='ml-auto'>
                                {!expanded ? <Icon name="ChevronDown" size={30} /> : <Icon name="ChevronUp" size={30} />}
                            </i>
                        )}
                    </button>
                </div>
            )}
            <ul className={`sublevel-nav ${expanded ? ' h-[height] transition-all duration-500 ease-in-out  opacity-100' : 'h-0 transition-all duration-500 ease-in-out opacity-0'}`}>
                {collapse && expanded && item.children && item.children!.map((child, index) => (
                    <MenuItem key={index} item={child} collapse={collapse} />
                ))}
            </ul>
        </li>
    );
};
