import { IRouterMenu } from '@/components/layout/IRouterMenu';
import { dataRoute } from '@/components/layout/dataRoute';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
export type StoreAlertVariant = "error" | "success";
export interface StoreMenuRoute {
    toggleMenu: (child: IRouterMenu) => void;
    toggleSubMenu: (child: IRouterMenu, ref: IRouterMenu) => void;
    routes: IRouterMenu[];
};

export const useStoreMenuRoute = create<StoreMenuRoute>()(
    devtools(
        persist(
            (set, get) => ({
                routes: dataRoute,
                toggleMenu: (c) => {
                    set((s: StoreMenuRoute) => ({
                        ...s, routes: s.routes.map(itm => {
                            if (c !== itm && itm.expanded) {
                                return { ...itm, expanded: false };
                            }
                            return { ...itm, expanded: !itm.expanded };
                        })
                    }));
                },
                toggleSubMenu: (c: IRouterMenu, r: IRouterMenu) => {
                    set((s: StoreMenuRoute) => ({
                        ...s, routes: s.routes.map(itm => {
                            if (itm === r) {
                                return {
                                    ...itm, children: itm.children?.map((e: IRouterMenu) => {
                                        if (e !== c && e.expanded) {
                                            return { ...e, expanded: false };
                                        }
                                        return { ...e, expanded: !c.expanded };
                                    })
                                };
                            }
                            return itm;
                        })
                    }));
                }
            }),
            {
                name: "routes",
                storage: createJSONStorage(() => sessionStorage)
            }
        )
    ));
