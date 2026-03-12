import { getSingleCarServer } from "@/lib/serverApi"; // Твоя функція запиту
import CarDetailsClient from "./CarDetails.client";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

interface CarPageProps {
    params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
    const { id } = await params;
    const car = await getSingleCarServer(id);

    return {
        title: `${car.brand} ${car.model} - Rent now`,
        description: `Rent ${car.brand} ${car.model} (${car.year}) for only ${car.rentalPrice}$/day. Check conditions and details.`,
        openGraph: {
            title: `${car.brand} ${car.model} | Car Rental`,
            description: car.description,
            images: [{ url: car.img }],
            url: `https://rental-cars-taupe.vercel.app/cars/${car.id}`
        }
    };
}


export default async function CarPage({ params }: CarPageProps) {
    const queryClient = new QueryClient();
    const { id } = await params;


    await queryClient.prefetchQuery({
        queryKey: ["car", id],
        queryFn: () => getSingleCarServer(id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            <CarDetailsClient carId={id} />
        </HydrationBoundary>
    );
}