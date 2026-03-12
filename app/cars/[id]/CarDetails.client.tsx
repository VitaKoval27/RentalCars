"use client";

import css from "./CarDetails.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";
import { useQuery } from "@tanstack/react-query";
import { getSingleCarClient } from "@/lib/clientApi";
import Loading from "@/app/loading";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

export default function CarDetailsClient({ carId }: { carId: string }) {

    const { data: car, isLoading, error } = useQuery({
        queryKey: ["car", carId],
        queryFn: () => getSingleCarClient(carId),
    });



    if (isLoading) return <Loading />;
    if (error || !car) return <p>Something went wrong...</p>;

    const addressArray = car.address.split(",");
    const city = addressArray[1]?.trim();
    const country = addressArray[2]?.trim();

    const conditionsArray = car?.rentalConditions || [];

    return (
        <div className={css.container}>

            {/* 1. Головне зображення зверху */}
            <div className={css.imageWrapper}>
                <Image
                    src={car.img}
                    alt="car"
                    width={640}
                    height={512}
                    className={css.mainImage}
                />
                <aside className={css.sidebar}>
                    <BookingForm />
                </aside>
            </div>

            <div className={css.rightColumn}>
                <div className={css.info}>
                    <div className={css.titleWrapper}>
                        <h2 className={css.title}>{car.brand} {car.model}, {car.year}</h2>
                        <span className={css.idLabel}>id: {car.id.slice(-4)}</span>
                    </div>

                    <div className={css.metaInfo}>
                        <div className={css.metaItem}>
                            <Icon id="Location" size={16} />
                            <span>{city},{country}</span>
                        </div>
                        <div className={css.metaItem}>
                            <span>Mileage: {car.mileage.toLocaleString("fi-FI")} km</span>
                        </div>
                    </div>

                    <p className={css.price}>${car.rentalPrice}</p>
                    <p className={css.desc}>{car.description}</p>
                </div>
                <div className={css.sectionsWrapper}></div>
                {/* Rental Conditions */}
                <div className={css.section}>
                    <h3 className={css.sectionLabel}>Rental Conditions:</h3>
                    <ul className={css.list}>
                        {conditionsArray.map((text, index) => (
                            <li key={index} className={css.listItem}>
                                <Icon id="checkircle" size={16} />
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Car Specifications */}
                <div className={css.section}>
                    <h3 className={css.sectionLabel}>Car Specifications:</h3>
                    <ul className={css.list}>
                        <li className={css.listItem}><Icon id="Vector" size={16} /> Year: {car.year}</li>
                        <li className={css.listItem}><Icon id="car" size={16} /> Type: {car.type}</li>
                        <li className={css.listItem}><Icon id="fuel-pump" size={16} /> Fuel: {car.fuelConsumption}</li>
                        <li className={css.listItem}><Icon id="gear" size={16} /> Engine: {car.engineSize}</li>
                    </ul>
                </div>

                {/* Accessories */}
                <section className={css.section}>
                    <h3 className={css.sectionLabel}>Accessories and functionalities:</h3>
                    <ul className={css.list}>
                        {[...car.accessories, ...car.functionalities].map((item: string, index: number) => (
                            <li key={index} className={css.listItem}>
                                <Icon id="checkircle" size={16} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>


        </div>

    );
}