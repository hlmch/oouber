import { create } from 'zustand';
import type {
  User,
  CartItem,
  Product,
  Budget,
  DeliveryMode,
  DeliveryAllocation,
  PromoCode,
  Recipient,
  CostCenter
} from '../types';
import { mockBudget } from '../utils/mockData';

interface AppState {
  // User & Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleItemSelection: (productId: string) => void;
  selectAllItems: (selected: boolean) => void;
  clearCart: () => void;

  // Delivery
  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (addressId: string | null) => void;
  deliveryAllocations: DeliveryAllocation[];
  setDeliveryAllocations: (allocations: DeliveryAllocation[]) => void;

  // Promo Code
  promoCode: PromoCode | null;
  setPromoCode: (code: PromoCode | null) => void;

  // Budget
  budget: Budget;
  updateBudget: (budget: Budget) => void;

  // Manager Interface
  selectedRecipients: Recipient[];
  addRecipient: (recipient: Recipient) => void;
  removeRecipient: (recipientId: string) => void;
  clearRecipients: () => void;
  setRecipients: (recipients: Recipient[]) => void;

  // Cost Center / PO
  selectedCostCenter: CostCenter | null;
  setSelectedCostCenter: (costCenter: CostCenter | null) => void;
  poReference: string;
  setPoReference: (ref: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // User & Auth
  user: null,
  setUser: (user) => set({ user }),

  // Cart
  cartItems: [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { product, quantity, selected: false }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),

  toggleItemSelection: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, selected: !item.selected }
          : item
      ),
    })),

  selectAllItems: (selected) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => ({ ...item, selected })),
    })),

  clearCart: () => set({ cartItems: [] }),

  // Delivery
  deliveryMode: 'single',
  setDeliveryMode: (mode) => set({ deliveryMode: mode }),

  selectedAddressId: null,
  setSelectedAddressId: (addressId) => set({ selectedAddressId: addressId }),

  deliveryAllocations: [],
  setDeliveryAllocations: (allocations) =>
    set({ deliveryAllocations: allocations }),

  // Promo Code
  promoCode: null,
  setPromoCode: (code) => set({ promoCode: code }),

  // Budget
  budget: mockBudget,
  updateBudget: (budget) => set({ budget }),

  // Manager Interface
  selectedRecipients: [],
  addRecipient: (recipient) =>
    set((state) => {
      if (state.selectedRecipients.find((r) => r.id === recipient.id)) {
        return state;
      }
      return {
        selectedRecipients: [...state.selectedRecipients, recipient],
      };
    }),

  removeRecipient: (recipientId) =>
    set((state) => ({
      selectedRecipients: state.selectedRecipients.filter(
        (r) => r.id !== recipientId
      ),
    })),

  clearRecipients: () => set({ selectedRecipients: [] }),

  setRecipients: (recipients) => set({ selectedRecipients: recipients }),

  // Cost Center / PO
  selectedCostCenter: null,
  setSelectedCostCenter: (costCenter) => set({ selectedCostCenter: costCenter }),

  poReference: '',
  setPoReference: (ref) => set({ poReference: ref }),
}));
