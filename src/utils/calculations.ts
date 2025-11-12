import type { CartItem, PromoCode } from '../types';

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.subsidizedPrice * item.quantity, 0);
};

export const calculateOriginalTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const calculateTotalSavings = (items: CartItem[]): number => {
  const original = calculateOriginalTotal(items);
  const subsidized = calculateSubtotal(items);
  return original - subsidized;
};

export const calculateVAT = (subtotal: number, vatRate: number = 0.19): number => {
  return subtotal * vatRate;
};

export const calculatePromoDiscount = (subtotal: number, promo?: PromoCode): number => {
  if (!promo) return 0;

  if (promo.minAmount && subtotal < promo.minAmount) return 0;

  if (promo.type === 'percentage') {
    return subtotal * (promo.discount / 100);
  }

  return Math.min(promo.discount, subtotal);
};

export const calculateTotal = (
  items: CartItem[],
  promo?: PromoCode,
  includeVAT: boolean = true
): number => {
  const subtotal = calculateSubtotal(items);
  const discount = calculatePromoDiscount(subtotal, promo);
  const afterDiscount = subtotal - discount;
  const vat = includeVAT ? calculateVAT(afterDiscount) : 0;
  return afterDiscount + vat;
};

export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

export const calculateBudgetImpact = (
  currentUsed: number,
  orderTotal: number,
  totalBudget: number
): {
  newUsed: number;
  newRemaining: number;
  percentageUsed: number;
  percentageRemaining: number;
  willExceedBudget: boolean;
} => {
  const newUsed = currentUsed + orderTotal;
  const newRemaining = totalBudget - newUsed;
  const percentageUsed = (newUsed / totalBudget) * 100;
  const percentageRemaining = (newRemaining / totalBudget) * 100;
  const willExceedBudget = newUsed > totalBudget;

  return {
    newUsed,
    newRemaining,
    percentageUsed,
    percentageRemaining,
    willExceedBudget,
  };
};

export const requiresApproval = (orderTotal: number, threshold: number = 5000): boolean => {
  return orderTotal > threshold;
};
