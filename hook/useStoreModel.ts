import { create } from "zustand";

export const useStoreModel = create<StoreModel>(
    (set, get) => ({
        isOpen: false,
        id: "",
        onEdit: (id: string) => set({ id, isOpen: !get().isOpen }),
        onOpen: () => set({ isOpen: !get().isOpen }),
        onClose: () => set({ isOpen: !get().isOpen, id: "" }),
    })
)