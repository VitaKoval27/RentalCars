import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { getCarsServer } from "@/lib/serverApi";
import CarsClient from "./Cars.client"

export const metadata: Metadata = {
    title: "Car Catalog | Rental App",
    description: "Choose your best car for rental",
};

export default async function CarsPage() {
    const queryClient = new QueryClient();


    await queryClient.prefetchQuery({
        queryKey: ["cars", { page: 1, limit: 12 }],
        queryFn: () => getCarsServer({ page: 1, limit: 12 }),
    });

    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <CarsClient />
        </HydrationBoundary>
    );
}