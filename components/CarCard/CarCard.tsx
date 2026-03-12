"use client"

import type { Car } from "@/types/car";
import Image from "next/image";
import css from "./CarCard.module.css";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCarStore } from "@/lib/storage/cars";

interface CarProps {
    car: Car
}

export default function CarCard({ car }: CarProps) {
    const { favorites, toggleFavorite } = useCarStore();
    const isFavorite = favorites.includes(car.id);


    const addressArray = car.address.split(",");
    const city = addressArray[1]?.trim();
    const country = addressArray[2]?.trim();

    const formattedMileage = car.mileage.toLocaleString("en-US").replace(/,/g, " ");

    return (
        <div className={css.card}>

            <button
                type="button"
                className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
                onClick={() => toggleFavorite(car.id)}
            >
                {isFavorite ? (
                    <FaHeart size={18} color="#3470FF" />
                ) : (
                    <FiHeart size={18} color="white" />
                )}
            </button>

            <div className={css.imageWrapper}>
                <Image
                    src={car.img}
                    className={css.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 274px"
                />
            </div>

            <div className={css.content}>
                <div className={css.firstRow}>
                    <h3 className={css.title}>
                        {car.brand}
                        <span className={css.model}> {car.model}</span>, {car.year}
                    </h3>
                    <span className={css.price}>${car.rentalPrice}</span>
                </div>
                <div className={css.secondRow}>
                    <span className={css.details}>{city} |</span>
                    <span className={css.details}>{country} |</span>
                    <span className={css.details}>{car.rentalCompany} |</span>
                </div>
                <div className={css.secondRow}>
                    <span className={css.details}>{car.type} |</span>
                    <span className={css.details}>{formattedMileage} km</span>
                </div>
            </div>

            <Link href={`/cars/${car.id}`} className={css.button}>
                Read more
            </Link>
        </div>
    )
}