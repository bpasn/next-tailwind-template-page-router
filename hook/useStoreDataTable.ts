import { IDataTable, PERPAGE_OPTION } from "@/components/data-table";
import { create } from "zustand";

export interface StoreDataTable<T> {
    loading: boolean;
    api: string;
    setLoading: (l: boolean) => void;
    dataTable: IDataTable<T>;
    onSelectChange: (v: string) => void;
    fetchDataTable: () => Promise<void>;
    setData:(data:IDataTable<T>) => void;
}

export const useStoreDataTable = <T>({ api }: { api: string }) => create<StoreDataTable<T>>((set, get) => ({
    loading: false,
    api,
    setLoading: (loading) => {
        set({ loading });
    },
    setData: (data: IDataTable<T>) => {
        set({ dataTable: data })
    },
    fetchDataTable: async () => {
        get().setLoading(true)
        let result = await fetch(get().api);
        let json: T[] = await result.json();
        set({
            dataTable: {
                ...get().dataTable,
                data: json,
                count: json.length
            }
        });
        get().setLoading(false);
    },

    dataTable: { data: [], count: 0, page: 0, pageSize: PERPAGE_OPTION.TEN },

    onSelectChange: (v) => {
        set({
            dataTable: {
                ...get().dataTable,
                pageSize: Number(v)
            }
        });
    },

}));

export const delay = (duration: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, duration));
}
