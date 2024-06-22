import { create } from "zustand";

export enum currencyEnum {
  Pounds = "gbp",
  Naira = "ngn",
}

interface CurrencyState {
  currency: currencyEnum;
  setCurrency: (value: currencyEnum) => void;
}

export const useCurrencyStore = create<CurrencyState>()((set) => ({
  currency: currencyEnum.Pounds,
  setCurrency: (value) => set({ currency: value }),
}));
