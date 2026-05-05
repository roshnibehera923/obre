import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: 'USD' | 'INR' | 'BOTH' = 'BOTH') {
  const usdPriceStr = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const inrPriceStr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 83);

  if (currency === 'USD') return usdPriceStr;
  if (currency === 'INR') return inrPriceStr;
  
  return `${usdPriceStr} / ${inrPriceStr}`;
}
