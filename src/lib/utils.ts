import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, types } from "./api";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertSize = (attributes: Product["attributes"]) => {
  if (attributes?.types === types.CANDLES) {
    return `${attributes?.size} oz`;
  }
  if (attributes?.types === types.OIL_DIFFUSERS) {
    return `${attributes?.size} ml`;
  }
  if (attributes?.types === types.COLLECTIONS) {
    return `${attributes?.size} gm`;
  }
};

export async function convertCurrency(
  amount: string,
  raw: boolean = false
): Promise<any> {
  try {
    const api = process.env.NEXT_PUBLIC_API_KEY;
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${api}/pair/GBP/NGN`
    );
    const rate = response.data.conversion_rate;
    const converted = parseFloat(amount) * rate;

    if (raw) return converted;

    return new Intl.NumberFormat(`en-NG`, {
      style: "currency",
      currency: "NGN",
    }).format(converted);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return new Intl.NumberFormat(`en-GB`, {
      style: "currency",
      currency: "GBP",
    }).format(parseFloat(amount));
  }
}
