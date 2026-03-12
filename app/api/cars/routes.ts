import { NextRequest, NextResponse } from "next/server";
import { api } from "../api"; 
import { isAxiosError } from "axios";
import { Filters } from "@/types/car";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    
    const page = searchParams.get("page") || "1";
    const brand = searchParams.get("brand");
    const rentalPrice = searchParams.get("rentalPrice");
    const minMileage = searchParams.get("minMileage");
    const maxMileage = searchParams.get("maxMileage");

    
    const params: Filters = {
      page: Number(page),
      limit: 12,
    };

    if (brand && brand !== "null") params.brand = brand;
    if (rentalPrice && rentalPrice !== "null") params.rentalPrice = rentalPrice;
    if (minMileage && minMileage !== "null") params.minMileage = Number(minMileage);
    if (maxMileage && maxMileage !== "null") params.maxMileage = Number(maxMileage);

  
    const res = await api.get("/cars", { params });

    return NextResponse.json(res.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, details: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}