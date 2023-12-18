import { create } from "zustand";

export enum PERPAGE_OPTION {
    TEN = 10,
    TWENTY_FIVE = 25,
    FIFTY = 50,
    ONE_HUNDRED = 100
}

const useStoreDataTableImplement = create<StoreDataTable<{ id: string }>>()((set, get) => ({
    loading: false,
    setLoading: (loading) => {
        set({ loading });
    },
    setData<T extends BaseModel>(data: T[]) {
        set({
            dataTable: {
                ...get().dataTable,
                count: data.length,
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
    setPageIndex: (page: number) => {
        set({ dataTable: { ...get().dataTable, page } })
    }
}));

export const useStoreDataTableBase = useStoreDataTableImplement as {
    <T extends BaseModel>(): StoreDataTable<T>;
    <T extends BaseModel, U>(selector: (s: StoreDataTable<T>) => U): U
}
export const delay = (duration: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, duration));
}
