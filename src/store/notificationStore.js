import { create } from "zustand";

const initialState = {
    visible: false,
    type: "info",
    message: "",
    title: undefined,
    duration: undefined,
};

export const useNotificationStore = create((set) => ({
    ...initialState,

    showNotification: ({ type, message, title, duration = 3000 }) =>
        set({ visible: true, type, message, title, duration }),

    hideNotification: () => set(initialState),
}));
