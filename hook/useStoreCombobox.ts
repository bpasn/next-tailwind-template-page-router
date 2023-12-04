import { create } from "zustand";

export const useStoreCombobox = create<UseStoreComboboxProps>()(
    (set, get) => ({
        isOpen: false,
        value: "",
        data: [],
        loading: false,
        onToggle: () => set({ isOpen: !get().isOpen }),
        initialValue: (value: string) => set({ value }),
        onSelect: (currentValue: string) => set({ value: currentValue }),
        filter: (value: string) => {
            set({ loading: true });
            set({
                value,
                data: get().data.filter(v => v.label.toLowerCase().search(value.toLowerCase()) > -1)
            });
            set({ loading: false });
        },
        setValue: (value: string) => set({ value }),
        setData: (data: ComboboxProps[]) => set({ data })
    }),
);