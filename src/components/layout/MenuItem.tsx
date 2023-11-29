import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IRouterMenu } from "./IRouterMenu";
import Icon from "./Icon";


export const MenuItem = ({ item, collapse }: { item: IRouterMenu; collapse: boolean }) => {
    const [expanded, setExpanded] = useState(item.expanded || false);
    const handleToggle = () => setExpanded(!expanded);
    const router = useRouter();
    return (
        <li>
            {item.routeLink ? (
                <Link href={item.routeLink}>
                    <label className={`nav-router-link ${router.pathname.substring(1) === (item.routeLink!.substring(1)) && 'active'} ${!collapse && "justify-center"}`}>
                        {item.icon && <Icon name={item.icon} size={30} className={`sublevel-link-icon`} />}
                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{item.label}</span>
                    </label>
                </Link>
            ) : (
                <div onClick={handleToggle}>
                    <li key={item.label}>
                        <label className={`nav-router-link ${!collapse && "justify-center"}`}>
                            {item.icon && <Icon name={item.icon} className='sublevel-link-icon' size={30} />}
                            <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>{item.label}</span>
                            {item.children && collapse && (
                                <i className='ml-auto'>
                                    {!expanded ? <Icon name="ChevronDown" size={30} /> : <Icon name="ChevronUp" size={30} />}
                                </i>
                            )}
                        </label>
                    </li>
                </div>
            )}
            <ul className={`sublevel-nav ${expanded ? ' h-[height] transition-all duration-[.5s] ease-in-out  opacity-100' : 'h-0 transition-all duration-[.5s] ease-in-out opacity-0'}`}>
                {collapse && expanded && item.children && item.children!.map((child, index) => (
                    <MenuItem key={index} item={child} collapse={collapse} />
                ))}
            </ul>
        </li>
    );
};
