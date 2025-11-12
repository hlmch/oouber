export type UserRole = 'fleet_partner' | 'manager' | 'poc';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName: string;
  territory?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  subsidizedPrice: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected?: boolean;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface DeliveryAllocation {
  addressId: string;
  percentage: number;
}

export interface Budget {
  total: number;
  used: number;
  remaining: number;
  period: 'quarterly' | 'annual';
  lastUpdated: Date;
}

export interface CostCenter {
  id: string;
  name: string;
  code: string;
  territory?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  subsidizedPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  subsidyAmount: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress?: Address;
  deliveryAllocations?: DeliveryAllocation[];
  costCenterId?: string;
  poReference?: string;
  createdAt: Date;
  requiresApproval: boolean;
}

export interface Recipient {
  id: string;
  name: string;
  email: string;
  type: 'fleet_partner' | 'manager';
  territory: string;
  defaultAddress?: Address;
}

export interface ProductTemplate {
  id: string;
  name: string;
  description: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  expiresAt?: Date;
}

export type DeliveryMode = 'single' | 'multiple';

export interface CartState {
  items: CartItem[];
  deliveryMode: DeliveryMode;
  selectedAddressId?: string;
  deliveryAllocations: DeliveryAllocation[];
  promoCode?: PromoCode;
}
