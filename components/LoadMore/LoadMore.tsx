"use client";

import { useCarStore } from "@/lib/storage/cars";
import css from "./LoadMore.module.css";

interface LoadMoreProps {
    isFetching: boolean;
}

export default function LoadMore({ isFetching }: LoadMoreProps) {
    const { cars, totalCars, filters, setFilters } = useCarStore();

    const hasMore = cars.length < totalCars;

    // Якщо машин немає або ми вже завантажили все — ховаємо кнопку
    if (!hasMore || cars.length === 0) return null;

    const handleLoadMore = () => {
        setFilters({ page: (filters.page || 1) + 1 });
    };

    return (
        <div className={css.wrapper}>
            <button
                className={css.button}
                onClick={handleLoadMore}
                disabled={isFetching}
            >
                {isFetching ? "Loading..." : "Load More"}
            </button>
        </div>
    );
}