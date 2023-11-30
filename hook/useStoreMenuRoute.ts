import { IRouterMenu } from '@/components/layout/IRouterMenu';
import { dataRoute } from '@/components/layout/dataRoute';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
export type StoreAlertVariant = "error" | "success";
export interface StoreMenuRoute {
    toggleMenu: (child: IRouterMenu) => void;
    toggleSubMenu: (child: IRouterMenu, index: number) => void;
    routes: IRouterMenu[];
};

export const useStoreMenuRoute = create<StoreMenuRoute>()(
    (set, get) => ({
        routes: dataRoute,
        toggleMenu: (c) => {
            set((s: StoreMenuRoute) => ({
                ...s, routes: s.routes.map(itm => {
                    if (c === itm) {
                        return { ...itm, expanded: !c.expanded };
                    }
                    return { ...itm, expanded: false }
                })
            }));
        },
        toggleSubMenu: (route: IRouterMenu, index: number) => {
            set((s: StoreMenuRoute) => {
                let routes: IRouterMenu[] = get().routes.map((item: IRouterMenu) => {
                    if (route.children && route.children.length) {
                        return {
                            ...item, children: item.children?.map((child: IRouterMenu, cIndex: number) => {
                                if (child.children?.length) {
                                   return get().toggleSubMenu(child, cIndex)
                                } else {
                                    if (child === route) {
                                        return { ...child, expanded: !route.expanded };
                                    }
                                }
                                return child;
                            })
                        }
                    }
                    return item;
                });

                return { ...s, routes };
            });
        }
    }),);
