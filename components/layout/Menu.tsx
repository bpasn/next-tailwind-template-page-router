'use client';
import { MenuItem } from './MenuItem';

import { IRouterMenu } from './IRouterMenu';
import { Button } from '../ui/button';
import Icon from './Icon';
import { signIn } from 'next-auth/react';


export const Menu = ({ menuItems, collapse }: { menuItems: IRouterMenu[]; collapse: boolean; }) => {
    const handleLogin = async () => {
        const result = await signIn("credentials", { redirect: false });
        if (result?.ok) {
            return window.location.href = "/";
        }
        console.log(result?.error)
    }
    return (
        <ul className='nav-menu '>
            {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} collapse={collapse} />
            ))}
            <li>
                <div >
                    <Button className={`nav-router-link ${!collapse && "justify-center"}`} onClick={handleLogin}>
                        <Icon name={"LogIn"} className='sublevel-link-icon' size={30} />
                        <span className={`nav-link-menu-item-text ${collapse ? "block" : "hidden"}`}>Login</span>
                    </Button>
                </div>
            </li>
        </ul>
    );
};
