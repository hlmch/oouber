# Uber Partner Shop - B2B E-commerce Platform

A comprehensive React web application for Uber's B2B Partner Shop platform, enabling fleet partners and managers to order subsidized products with budget tracking and multi-recipient functionality.

## Features

### 🔐 Authentication & Access Control
- SSO simulation with role-based access
- Three shop types: Fleet Partner, Management, and Public
- Protected routes based on user roles

### 🛒 Fleet Partner Cart
- **Cart Management**
  - Add/remove products with quantity controls
  - Bulk selection and actions
  - Real-time price calculations with subsidies
  - "You save" indicators showing subsidy amounts

- **Delivery Options**
  - Single location delivery
  - Multiple location delivery with percentage allocation
  - Address management

- **Order Summary**
  - Detailed price breakdown (subtotal, subsidy, VAT, total)
  - Budget impact visualization with progress bars
  - Promo code support
  - Cost center/PO reference tracking
  - Approval requirements for orders >€5,000

### 👥 Manager Send Interface
Three-panel layout for sending products to multiple recipients:

- **Panel 1 - Recipients**
  - Search and filter by territory/type
  - Checkbox selection with bulk actions
  - CSV upload support (mock)
  - Selected recipients as removable pills

- **Panel 2 - Products**
  - Product templates (Starter Kit, Safety Bundle, etc.)
  - Individual product selection with quantities
  - Bulk quantity calculator
  - Running total per recipient

- **Panel 3 - Allocation & Funding**
  - Cost center selection
  - Budget visualization and impact
  - PO reference and notes
  - Approval workflow for high-value orders
  - Order summary with total calculations

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 3
- **State Management:** Zustand
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Forms:** React Hook Form (ready for integration)
- **UI Components:** Headless UI
- **Icons:** Lucide React
- **Data Fetching:** React Query (TanStack Query)
- **Charts:** Recharts

## Project Structure

```
src/
├── components/
│   ├── common/              # Shared components
│   │   ├── Header.tsx       # App header with user info & cart
│   │   ├── BudgetIndicator.tsx  # Budget progress display
│   │   ├── ProductCard.tsx  # Reusable product card
│   │   └── QuantitySelector.tsx # +/- quantity control
│   ├── cart/                # Cart-specific components
│   │   ├── CartItem.tsx     # Individual cart item
│   │   ├── CartSummary.tsx  # Order summary with totals
│   │   └── DeliveryOptions.tsx  # Delivery mode selection
│   └── manager/             # Manager interface components
│       ├── RecipientPanel.tsx   # Recipient selection
│       ├── ProductPanel.tsx     # Product selection
│       └── AllocationPanel.tsx  # Budget & funding
├── pages/
│   ├── Login.tsx            # SSO login simulation
│   ├── ShopSelector.tsx     # Shop type selection
│   ├── FleetPartnerCart.tsx # Main cart page
│   └── ManagerSend.tsx      # Multi-recipient interface
├── stores/
│   └── store.ts             # Zustand global state
├── types/
│   └── index.ts             # TypeScript interfaces
├── utils/
│   ├── mockData.ts          # Mock data for demo
│   └── calculations.ts      # Price/budget calculations
└── App.tsx                  # Router setup
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app runs on `http://localhost:5173` by default.

## User Flows

### Fleet Partner Flow
1. Login with fleet partner credentials
2. Select "Fleet Partner Shop"
3. Browse and add products to cart
4. View subsidized pricing and savings
5. Configure delivery options
6. Apply promo codes
7. Review budget impact
8. Checkout (or request approval if >€5,000)

### Manager Flow
1. Login with manager credentials
2. Select "Management Shop"
3. **Recipients:** Search and select multiple partners
4. **Products:** Choose items or apply templates
5. **Allocation:** Select cost center and review budget
6. Submit order or request approval

## Mock Data

The application includes comprehensive mock data:

- **Users:** 3 mock users (fleet partner, manager, POC)
- **Products:** 8 products across categories (Electronics, Safety, Maintenance)
- **Addresses:** 3 delivery locations
- **Cost Centers:** 3 territories with budget codes
- **Recipients:** 5 partners/managers
- **Templates:** 3 product bundles

### Test Credentials
Select any user from the dropdown:
- John Smith (Fleet Partner)
- Sarah Johnson (Manager)
- Mike Davis (POC)

### Promo Code
- Code: `SAVE10` (10% discount)

## Key Features Implementation

### Budget Tracking
- Real-time budget calculations
- Visual progress bars
- Impact preview before checkout
- Warning for budget overruns

### Subsidy Pricing
- Original price strikethrough
- Subsidized price display
- Total savings calculation
- Per-item and total savings

### Responsive Design
- **Desktop (>1024px):** Full multi-column layouts
- **Tablet (768-1024px):** Adapted panels and tabs
- **Mobile (<768px):** Single column, bottom sheets, step flows

### Approval Workflow
- Automatic approval requirement for orders >€5,000
- Manager notification simulation
- Clear indicators in UI

## Calculations

All pricing and budget calculations are centralized in `utils/calculations.ts`:

- `calculateSubtotal()` - Cart subtotal with subsidized prices
- `calculateVAT()` - 19% VAT calculation
- `calculateTotal()` - Final total with discounts
- `calculateBudgetImpact()` - Budget before/after analysis
- `requiresApproval()` - Approval threshold checking
- `formatCurrency()` - Consistent EUR formatting

## Styling

The app uses Uber's color scheme:
- **Primary:** Black (#000000)
- **Secondary:** Blue (#276EF1)
- **Success:** Green (#0F9D58)
- **Grays:** Custom gray scale

All components follow an 8px grid system with consistent spacing.

## Future Enhancements

- Real API integration
- Actual SSO authentication (Uber ID)
- Order history and tracking
- PDF invoice generation
- Email notifications
- Analytics dashboard
- Product search and filtering
- Wishlist/saved items
- Multi-language support
- Accessibility improvements (WCAG 2.1 AA)

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Code splitting with React.lazy (ready for implementation)
- Optimized images with lazy loading
- Minimal bundle size with tree-shaking
- Fast development with Vite HMR

## License

This is a demo project created for Uber Partner Shop concept demonstration.

## Development Notes

- TypeScript strict mode enabled
- ESLint configured for code quality
- All components are fully typed
- Mock data can be easily replaced with API calls
- State management is centralized and scalable
