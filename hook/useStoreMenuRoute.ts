import { IRouterMenu } from '@/components/layout/IRouterMenu';
import { dataRoute } from '@/components/layout/dataRoute';
import { create } from 'zustand';
export type StoreAlertVariant = "error" | "success";
export interface StoreMenuRoute {
    collapse: boolean;
    setCollapse: (b: boolean) => void;
    routes: IRouterMenu[];
};

export const useStoreMenuRoute = create<StoreMenuRoute>()(
    (set, get) => ({
        routes: dataRoute,
        collapse: true,
        setCollapse: (collapse) => set({ collapse })
    }),);
