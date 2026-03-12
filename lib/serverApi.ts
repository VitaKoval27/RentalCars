
import type { Car, CarsResponse, Filters } from "@/types/car";
import { nextServer } from "./api";




export async function getCarsServer(options: Filters = {}): Promise<CarsResponse> {
  const { brand, rentalPrice, minMileage, maxMileage, page = 1, limit = 12 } = options;

  const params = {
    brand: brand || undefined,
    rentalPrice: rentalPrice || undefined,
    minMileage: minMileage || undefined,
    maxMileage: maxMileage || undefined,
    page,
    limit,
  };

  const response = await nextServer.get<CarsResponse>("/cars", { params });
  return response.data;
}

export async function getBrandsServer(): Promise<string[]> {
  const response = await nextServer.get<string[]>("/brands");
  return response.data;
}

export async function getSingleCarServer(id: string): Promise<Car> {
  const response = await nextServer.get<Car>(`/cars/${id}`);
  return response.data;
}