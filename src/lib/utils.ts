import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CurrencyCode =
  | 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED'
  | 'SGD' | 'AUD' | 'CAD' | 'JPY' | 'CHF' | 'BOTH';

const RATES: Record<string, number> = {
  USD: 1, INR: 83, EUR: 0.92, GBP: 0.79, AED: 3.67,
  SGD: 1.34, AUD: 1.53, CAD: 1.36, JPY: 149.5, CHF: 0.89,
};

const LOCALES: Record<string, string> = {
  USD: 'en-US', INR: 'en-IN', EUR: 'de-DE', GBP: 'en-GB',
  AED: 'en-AE', SGD: 'en-SG', AUD: 'en-AU', CAD: 'en-CA',
  JPY: 'ja-JP', CHF: 'de-CH',
};

export function formatPrice(price: number, currency: CurrencyCode = 'BOTH'): string {
  const fmt = (amount: number, code: string) =>
    new Intl.NumberFormat(LOCALES[code] || 'en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  if (currency === 'BOTH') {
    return `${fmt(price, 'USD')} / ${fmt(price * 83, 'INR')}`;
  }

  const rate = RATES[currency] ?? 1;
  return fmt(price * rate, currency);
}

export const CURRENCY_META: { code: CurrencyCode; name: string; symbol: string }[] = [
  { code: 'USD',  name: 'US Dollar',        symbol: '$'   },
  { code: 'INR',  name: 'Indian Rupee',      symbol: '₹'   },
  { code: 'EUR',  name: 'Euro',              symbol: '€'   },
  { code: 'GBP',  name: 'British Pound',     symbol: '£'   },
  { code: 'AED',  name: 'UAE Dirham',        symbol: 'AED' },
  { code: 'SGD',  name: 'Singapore Dollar',  symbol: 'S$'  },
  { code: 'AUD',  name: 'Australian Dollar', symbol: 'A$'  },
  { code: 'CAD',  name: 'Canadian Dollar',   symbol: 'C$'  },
  { code: 'JPY',  name: 'Japanese Yen',      symbol: '¥'   },
  { code: 'CHF',  name: 'Swiss Franc',       symbol: 'CHF' },
  { code: 'BOTH', name: 'USD + INR',         symbol: '$·₹' },
];

export function getBudgetLabel(opt: string, currency: CurrencyCode): string {
  if (currency === 'USD') return opt;

  if (currency === 'BOTH') {
    if (opt === 'Under $1,000')    return 'Under $1,000 / ₹83,000';
    if (opt === '$1,000–$2,000')   return '$1,000–$2,000 / ₹83,000–₹1,66,000';
    if (opt === '$2,000+')         return '$2,000+ / ₹1,66,000+';
    return opt;
  }

  const meta = CURRENCY_META.find(c => c.code === currency);
  if (!meta) return opt;

  const rate = RATES[currency] ?? 1;
  const sym  = meta.symbol;
  const n    = (usd: number) => {
    const v = Math.round(usd * rate);
    return currency === 'INR'
      ? new Intl.NumberFormat('en-IN').format(v)
      : new Intl.NumberFormat('en-US').format(v);
  };

  if (opt === 'Under $1,000')   return `Under ${sym}${n(1000)}`;
  if (opt === '$1,000–$2,000')  return `${sym}${n(1000)}–${sym}${n(2000)}`;
  if (opt === '$2,000+')        return `${sym}${n(2000)}+`;
  return opt;
}
