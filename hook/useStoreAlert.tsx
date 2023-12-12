import { create } from "zustand";

export const useAlertStore = create<{
    message: string;
    show: boolean;
    onClose: () => void;
    onShow: (m: string) => void;
}>((set) => ({
    message: "",
    show: false,
    onClose: () => set({ show: false, message: "" }),
    onShow: (message: string) => set({ show: true, message }),
}));