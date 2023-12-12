import { IDataTable, PERPAGE_OPTION } from "@/components/data-table";
import { create } from "zustand";

export interface StoreDataTable<T extends BaseModel> {
    loading: boolean;
    setLoading: (l: boolean) => void;
    dataTable: IDataTable<T>;
    onSelectChange: (v: string) => void;
    setData: (data: T[]) => void;
}

const useStoreDataTableImplement = create<StoreDataTable<{}>>()((set, get) => ({
    loading: false,
    setLoading: (loading) => {
        set({ loading });
    },
    setData<T extends BaseModel>(data: T[]) {
        set({
            dataTable: {
                ...get().dataTable,
                data: data,
            }
        });
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

export const useStoreDataTableBase = useStoreDataTableImplement as {
    <T extends BaseModel>(): StoreDataTable<T>;
    <T extends BaseModel , U>(selector: (s: StoreDataTable<T>) => U): U
}
export const delay = (duration: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, duration));
}
