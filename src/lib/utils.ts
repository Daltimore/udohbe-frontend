import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, types } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertSize = (attributes: Product["attributes"]) => {
  if (attributes.types === types.CANDLES) {
    return `${attributes.size} oz`;
  }
  if (attributes.types === types.OIL_DIFFUSERS) {
    return `${attributes.size} ml`;
  }
  if (attributes.types === types.COLLECTIONS) {
    return `${attributes.size} gm`;
  }
};
