import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (jobId) => {
                set((state) => ({
                    favorites: state.favorites.includes(jobId)
                        ? state.favorites
                        : [...state.favorites, jobId],
                }));
            },

            removeFavorite: (jobId) => {
                set((state) => ({
                    favorites: state.favorites.filter((id) => id !== jobId),
                }));
            },

            isFavorite: (jobId) => get().favorites.includes(jobId),

            toggleFavorite: (jobId) => {
                const { addFavorite, removeFavorite, isFavorite } = get();
                const isFav = isFavorite(jobId);
                isFav ? removeFavorite(jobId) : addFavorite(jobId);
            },

            countFavorites: () => get().favorites.length,
        }),
        { name: "favorites" }
    )
);
