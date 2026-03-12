"use client";

import { useEffect, useState, useRef } from "react";
import { useCarStore } from "@/lib/storage/cars";
import { getBrandsClient, getCarsClient } from "@/lib/clientApi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import css from "./Filters.module.css";

export default function Filters() {
    const { filters, setFilters, setCars, setTotalCars, setLoading, isLoading } = useCarStore();


    const [tempBrand, setTempBrand] = useState(filters.brand || "");
    const [tempPrice, setTempPrice] = useState(filters.rentalPrice || "");
    const [tempMinMileage, setTempMinMileage] = useState(filters.minMileage?.toString() || "");
    const [tempMaxMileage, setTempMaxMileage] = useState(filters.maxMileage?.toString() || "");

    const [brands, setBrands] = useState<string[]>([]);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);

    const brandRef = useRef<HTMLDivElement>(null);
    const priceRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        setTempBrand(filters.brand || "");
        setTempPrice(filters.rentalPrice || "");
        setTempMinMileage(filters.minMileage?.toString() || "");
        setTempMaxMileage(filters.maxMileage?.toString() || "");
    }, [filters]);

    useEffect(() => {
        getBrandsClient().then(setBrands).catch(console.error);

        const handleClickOutside = (event: MouseEvent) => {
            if (brandRef.current && !brandRef.current.contains(event.target as Node)) setIsBrandOpen(false);
            if (priceRef.current && !priceRef.current.contains(event.target as Node)) setIsPriceOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const prices = Array.from({ length: 48 }, (_, i) => (i + 3) * 10);


    const handleSearch = async () => {
        setLoading(true);

        const newFilters = {
            ...filters,
            brand: tempBrand,
            rentalPrice: tempPrice,
            minMileage: tempMinMileage ? Number(tempMinMileage) : undefined,
            maxMileage: tempMaxMileage ? Number(tempMaxMileage) : undefined,
            page: 1,
        };

        try {

            setFilters(newFilters);

            const data = await getCarsClient(newFilters);
            setCars(data.cars, false);
            setTotalCars(data.totalCars);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatMileage = (val: string, prefix: string) => {
        if (!val) return "";
        const formatted = Number(val).toLocaleString("en-US");
        return `${prefix} ${formatted}`;
    };

    return (
        <div className={css.filterWrapper}>
            {/* BRAND */}
            <div className={css.fieldGroup} ref={brandRef}>
                <label className={css.label}>Car brand</label>
                <div className={css.customSelectContainer} style={{ width: "224px" }}>
                    <div className={css.selectTrigger} onClick={() => setIsBrandOpen(!isBrandOpen)}>
                        <span className={!tempBrand ? css.placeholder : ""}>
                            {tempBrand || "Choose a brand"}
                        </span>
                        {isBrandOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </div>
                    {isBrandOpen && (
                        <ul className={css.dropdownList}>
                            <li className={css.dropdownItem} onClick={() => { setTempBrand(""); setIsBrandOpen(false); }}>All brands</li>
                            {brands.map(b => (
                                <li key={b} className={`${css.dropdownItem} ${tempBrand === b ? css.selected : ""}`}
                                    onClick={() => { setTempBrand(b); setIsBrandOpen(false); }}>{b}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* PRICE */}
            <div className={css.fieldGroup} ref={priceRef}>
                <label className={css.label}>Price/ 1hr</label>
                <div className={css.customSelectContainer} style={{ width: "125px" }}>
                    <div className={css.selectTrigger} onClick={() => setIsPriceOpen(!isPriceOpen)}>
                        <span className={!tempPrice ? css.placeholder : ""}>
                            {tempPrice ? `To ${tempPrice}$` : "To $"}
                        </span>
                        {isPriceOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </div>
                    {isPriceOpen && (
                        <ul className={css.dropdownList}>
                            <li className={css.dropdownItem} onClick={() => { setTempPrice(""); setIsPriceOpen(false); }}>All prices</li>
                            {prices.map(p => (
                                <li key={p} className={`${css.dropdownItem} ${tempPrice === p.toString() ? css.selected : ""}`}
                                    onClick={() => { setTempPrice(p.toString()); setIsPriceOpen(false); }}>{p}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* MILEAGE */}
            <div className={css.fieldGroup}>
                <label className={css.label}>Сar mileage / km</label>
                <div className={css.mileageContainer}>
                    <div className={css.inputWrapper}>
                        <input
                            type="text"
                            className={css.inputLeft}
                            value={tempMinMileage ? formatMileage(tempMinMileage, "From") : ""}
                            placeholder="From"
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setTempMinMileage(val);
                            }}
                        />
                    </div>
                    <div className={css.inputWrapper}>
                        <input
                            type="text"
                            className={css.inputRight}
                            value={tempMaxMileage ? formatMileage(tempMaxMileage, "To") : ""}
                            placeholder="To"
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setTempMaxMileage(val);
                            }}
                        />
                    </div>
                </div>
            </div>
            <button className={css.searchBtn} onClick={handleSearch} disabled={isLoading}>
                Search
            </button>
        </div>
    );
}