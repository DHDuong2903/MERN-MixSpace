import { create } from "zustand";
import { Song } from "@/types";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface FavoritesStore {
  favorites: Song[];
  isLoading: boolean;
  error: string | null;

  fetchFavorites: () => Promise<void>;
  addFavorite: (songId: string) => Promise<void>;
  removeFavorite: (songId: string) => Promise<void>;
}

export const useFavoriteStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,

  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/users/favorites");
      set({ favorites: res.data });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load favourites");
    } finally {
      set({ isLoading: false });
    }
  },

  addFavorite: async (songId: string) => {
    try {
      await axiosInstance.post(`/users/favorites/${songId}`);
      toast.success("Added to favourites");
      get().fetchFavorites();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to add favourite");
    }
  },

  removeFavorite: async (songId: string) => {
    try {
      await axiosInstance.delete(`/users/favorites/${songId}`);
      toast.success("Removed from favourites");
      get().fetchFavorites();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to remove favourite");
    }
  },
}));
