import css from "./CarList.module.css"
import type { Car } from "@/types/car"
import CarCard from "../CarCard/CarCard"


interface CarsListProps {
    cars: Car[],
}

export default function CarList({ cars }: CarsListProps) {

    return (
        <ul className={css.list}>
            {cars.map((car) => (
                <li key={car.id} className={css.listItem}>
                    <CarCard car={car} />
                </li>
            ))}
        </ul>
    )
}