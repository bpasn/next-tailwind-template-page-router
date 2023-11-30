'use client';
import { MenuItem } from './MenuItem';

import { IRouterMenu } from './IRouterMenu';


export const Menu = ({ menuItems, collapse }: { menuItems: IRouterMenu[]; collapse: boolean; }) => {
    return (
        <ul className='nav-menu '>
            {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} collapse={collapse} />
            ))}
        </ul>
    );
};
