import { create } from "zustand";

export const useStoreModel = create<StoreModel>(
    (set, get) => ({
        isOpen: false,
        onOpen:() => set({isOpen:!get().isOpen}),
        onClose: () => set({ isOpen: !get().isOpen }),
    })
)