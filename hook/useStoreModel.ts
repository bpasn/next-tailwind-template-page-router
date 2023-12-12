import { create } from "zustand";

type BaseStore<T> = {
    items: T;
}

const useDataImplementation = create<StoreModel<{}>>((set, get) => ({
    isOpen: false,
    data: null,
    onEdit<T>(data: T) {
        return set({ data, isOpen: !get().isOpen });
    },
    onOpen: () => set({ isOpen: !get().isOpen }),
    onClose: () => set({ isOpen: !get().isOpen, data: null }),
}));

export const useStoreModalBase = useDataImplementation as {
    <T>(): StoreModel<T>;
    <T, U>(selector: (s: StoreModel<T>) => U): U;
};