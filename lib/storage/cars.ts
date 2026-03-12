import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Car, Filters } from "@/types/car";

const initialFilters: Filters = {
  page: 1,
  limit: 12,
  brand: "",
  rentalPrice: "",
  minMileage: undefined,
  maxMileage: undefined,
};

interface CarStore {
  cars: Car[];
  filters: Filters;
  favorites: string[];
  totalCars: number;
  isLoading: boolean;

  setCars: (cars: Car[], append: boolean) => void;
  setFilters: (newFilters: Partial<Filters>) => void;
  setTotalCars: (total: number) => void;
  toggleFavorite: (id: string) => void;
  resetCars: () => void;
  setLoading: (status: boolean) => void;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      cars: [],
      filters: initialFilters,
      favorites: [],
      totalCars: 0,
      isLoading: false,

      setCars: (newCars, append) =>
        set((state) => ({
          cars: append ? [...state.cars, ...newCars] : newCars,
        })),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      setTotalCars: (total) => set({ totalCars: total }),

      setLoading: (status) => set({ isLoading: status }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      resetCars: () => set({ cars: [], totalCars: 0 }),
    }),
    {
      name: "car-rental-storage",
     
      partialize: (state) => ({ 
        favorites: state.favorites,
        filters: state.filters 
      }),
    }
  )
);