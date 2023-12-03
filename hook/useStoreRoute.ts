import { IRouterMenu } from '@/components/layout/IRouterMenu';
import { dataRoute } from '@/components/layout/dataRoute';
import { create } from 'zustand';
export type StoreAlertVariant = "error" | "success";
export interface StoreMenuRoute {
    collapse: boolean;
    setCollapse: (b: boolean) => void;
    routes: IRouterMenu[];
    screenWidth: number,
    setScreenWidth: (s: number) => void;
    loading:boolean;
    setLoading: () => void;
};
export const useStoreRoute = create<StoreMenuRoute>()(
    (set, get) => ({
        routes: dataRoute,
        collapse: true,
        screenWidth: typeof window === 'undefined' ? 0 : window.innerWidth,
        loading: false,
        setLoading: () => set({ loading: !get().loading }),
        setCollapse: (collapse) => set({ collapse }),
        setScreenWidth: (screenWidth: number) => set({ screenWidth })
    }),);
