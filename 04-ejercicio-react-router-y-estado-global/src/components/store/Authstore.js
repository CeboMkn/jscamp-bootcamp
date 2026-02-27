import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthstore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false }),
        }),
        { name: "auth" }
    )
);
