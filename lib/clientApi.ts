import type { Car, CarsResponse, Filters } from "@/types/car";
import { nextServer } from "./api";

export async function getCarsClient(options: Filters = {}): Promise<CarsResponse> {
  
  const params = Object.fromEntries(
  Object.entries(options).filter((entry) => {
    const value = entry[1]; 
    return value !== "" && value !== undefined && value !== null;
  })
);

  
  const response = await nextServer.get<CarsResponse>("/cars", { params });
  return response.data;
}

export async function getBrandsClient(): Promise<string[]> {
  const response = await nextServer.get<string[]>("/brands");
  return response.data;
}

export async function getSingleCarClient(id:string){
  const response= await nextServer.get<Car>(`/cars/${id}`)
  return response.data
}