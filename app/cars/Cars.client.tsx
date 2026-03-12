"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCarStore } from "@/lib/storage/cars";
import { getCarsClient } from "@/lib/clientApi";
import Filters from "@/components/Filters/Filters";
import CarList from "@/components/CarList/CarList";
import LoadMore from "@/components/LoadMore/LoadMore";
import css from "./Cars.module.css";
import Loading from "../loading";

export default function CarsClient() {
    const {
        filters,
        cars,
        setCars,
        setTotalCars,
        setLoading
    } = useCarStore();

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["cars", filters],
        queryFn: () => getCarsClient(filters),
        placeholderData: (previousData) => previousData,
    });

    useEffect(() => {
        if (data) {
            const isFirstPage = (filters.page || 1) === 1;

            if (isFirstPage) {
                setCars(data.cars, false);
            } else {
                // Використовуємо поточний стейт cars з аргументу, щоб не додавати його в залежності
                const existingIds = new Set(cars.map(car => car.id));
                const uniqueNewCars = data.cars.filter(car => !existingIds.has(car.id));

                if (uniqueNewCars.length > 0) {
                    setCars(uniqueNewCars, true);
                }
            }
            setTotalCars(data.totalCars);
        }
    }, [data, filters.page, setCars, setTotalCars]);

    useEffect(() => {
        setLoading(isLoading || isFetching);
    }, [isLoading, isFetching, setLoading]);

    return (
        <div className={css.container} suppressHydrationWarning>
            <Filters />

            <section className={css.catalog}>
                {(isLoading || isFetching) ? (
                    <Loading />
                ) : (
                    <>
                        {cars.length > 0 ? (
                            <CarList cars={cars} />
                        ) : (
                            !isFetching && <p className={css.noResults}>No cars found matching your criteria.</p>
                        )}
                    </>
                )}
            </section>

            <LoadMore isFetching={isFetching} />
        </div>
    );
}