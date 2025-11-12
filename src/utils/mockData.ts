import type {
  User,
  Product,
  Address,
  Budget,
  CostCenter,
  Recipient,
  ProductTemplate
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john.smith@fleetpartner.com',
    role: 'fleet_partner',
    companyName: 'City Fleet Services',
    territory: 'North Region'
  },
  {
    id: 'u2',
    name: 'Sarah Johnson',
    email: 'sarah.j@uber.com',
    role: 'manager',
    companyName: 'Uber',
    territory: 'East Region'
  },
  {
    id: 'u3',
    name: 'Mike Davis',
    email: 'mike.d@uber.com',
    role: 'poc',
    companyName: 'Uber'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Professional Dash Camera',
    description: 'HD dash camera with night vision and GPS tracking',
    sku: 'DC-PRO-001',
    price: 199.99,
    subsidizedPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1591290619762-d4c752f26e32?w=400&h=300&fit=crop',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 'p2',
    name: 'Premium Phone Mount',
    description: 'Magnetic phone mount with adjustable arm',
    sku: 'PM-PREM-002',
    price: 39.99,
    subsidizedPrice: 9.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    category: 'Accessories',
    inStock: true
  },
  {
    id: 'p3',
    name: 'USB Car Charger Dual Port',
    description: 'Fast charging dual USB ports for phone and accessories',
    sku: 'CC-USB-003',
    price: 24.99,
    subsidizedPrice: 5.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    category: 'Electronics',
    inStock: true
  },
  {
    id: 'p4',
    name: 'First Aid Kit',
    description: 'Comprehensive first aid kit for vehicles',
    sku: 'FK-STD-004',
    price: 49.99,
    subsidizedPrice: 14.99,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop',
    category: 'Safety',
    inStock: true
  },
  {
    id: 'p5',
    name: 'Safety Vest High Visibility',
    description: 'Reflective safety vest with Uber branding',
    sku: 'SV-HV-005',
    price: 19.99,
    subsidizedPrice: 4.99,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
    category: 'Safety',
    inStock: true
  },
  {
    id: 'p6',
    name: 'Car Cleaning Kit',
    description: 'Premium car cleaning supplies bundle',
    sku: 'CK-PREM-006',
    price: 59.99,
    subsidizedPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
    category: 'Maintenance',
    inStock: true
  },
  {
    id: 'p7',
    name: 'Emergency Triangle Kit',
    description: 'Reflective warning triangles (pack of 3)',
    sku: 'ET-KIT-007',
    price: 29.99,
    subsidizedPrice: 7.99,
    image: 'https://images.unsplash.com/photo-1449247666642-264389f5f5b1?w=400&h=300&fit=crop',
    category: 'Safety',
    inStock: true
  },
  {
    id: 'p8',
    name: 'Tire Pressure Gauge Digital',
    description: 'Digital tire pressure gauge with LED display',
    sku: 'TPG-DIG-008',
    price: 34.99,
    subsidizedPrice: 9.99,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    category: 'Maintenance',
    inStock: true
  }
];

export const mockAddresses: Address[] = [
  {
    id: 'a1',
    label: 'Main Warehouse',
    street: '123 Fleet Street',
    city: 'San Francisco',
    postalCode: '94102',
    country: 'USA',
    isDefault: true
  },
  {
    id: 'a2',
    label: 'East Bay Location',
    street: '456 Oakland Ave',
    city: 'Oakland',
    postalCode: '94601',
    country: 'USA'
  },
  {
    id: 'a3',
    label: 'South Bay Depot',
    street: '789 San Jose Blvd',
    city: 'San Jose',
    postalCode: '95110',
    country: 'USA'
  }
];

export const mockBudget: Budget = {
  total: 50000,
  used: 12500,
  remaining: 37500,
  period: 'quarterly',
  lastUpdated: new Date()
};

export const mockCostCenters: CostCenter[] = [
  {
    id: 'cc1',
    name: 'North Region Fleet',
    code: 'NRF-2024-Q4',
    territory: 'North Region'
  },
  {
    id: 'cc2',
    name: 'East Region Operations',
    code: 'ERO-2024-Q4',
    territory: 'East Region'
  },
  {
    id: 'cc3',
    name: 'West Coast Marketing',
    code: 'WCM-2024-Q4',
    territory: 'West Region'
  }
];

export const mockRecipients: Recipient[] = [
  {
    id: 'r1',
    name: 'Alex Turner',
    email: 'alex.t@fleet1.com',
    type: 'fleet_partner',
    territory: 'North Region',
    defaultAddress: mockAddresses[0]
  },
  {
    id: 'r2',
    name: 'Emma Wilson',
    email: 'emma.w@fleet2.com',
    type: 'fleet_partner',
    territory: 'East Region',
    defaultAddress: mockAddresses[1]
  },
  {
    id: 'r3',
    name: 'Chris Martinez',
    email: 'chris.m@fleet3.com',
    type: 'fleet_partner',
    territory: 'North Region',
    defaultAddress: mockAddresses[0]
  },
  {
    id: 'r4',
    name: 'Lisa Chen',
    email: 'lisa.c@uber.com',
    type: 'manager',
    territory: 'West Region',
    defaultAddress: mockAddresses[2]
  },
  {
    id: 'r5',
    name: 'David Brown',
    email: 'david.b@fleet4.com',
    type: 'fleet_partner',
    territory: 'East Region',
    defaultAddress: mockAddresses[1]
  }
];

export const mockTemplates: ProductTemplate[] = [
  {
    id: 't1',
    name: 'Starter Kit',
    description: 'Essential items for new drivers',
    products: [
      { productId: 'p2', quantity: 1 },
      { productId: 'p3', quantity: 1 },
      { productId: 'p5', quantity: 1 }
    ]
  },
  {
    id: 't2',
    name: 'Safety Bundle',
    description: 'Complete safety equipment package',
    products: [
      { productId: 'p4', quantity: 1 },
      { productId: 'p5', quantity: 2 },
      { productId: 'p7', quantity: 1 }
    ]
  },
  {
    id: 't3',
    name: 'Premium Electronics',
    description: 'Top-tier electronics for professional drivers',
    products: [
      { productId: 'p1', quantity: 1 },
      { productId: 'p2', quantity: 1 },
      { productId: 'p3', quantity: 2 }
    ]
  }
];
