import { useEffect } from 'react';
import { ShoppingBag, Trash2, Package } from 'lucide-react';
import { useStore } from '../stores/store';
import { mockProducts } from '../utils/mockData';
import Header from '../components/common/Header';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import DeliveryOptions from '../components/cart/DeliveryOptions';
import ProductCard from '../components/common/ProductCard';

const FleetPartnerCart = () => {
  const { cartItems, selectAllItems, addToCart } = useStore();

  // Add some sample products to cart if empty (for demo purposes)
  useEffect(() => {
    if (cartItems.length === 0) {
      addToCart(mockProducts[0], 2);
      addToCart(mockProducts[1], 1);
      addToCart(mockProducts[3], 1);
    }
  }, []);

  const selectedItems = cartItems.filter((item) => item.selected);
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  const handleRemoveSelected = () => {
    // This would be implemented in the store
    console.log('Remove selected items');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to get started
            </p>

            {/* Product Suggestions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Suggested Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockProducts.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Cart Items & Delivery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bulk Actions */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => selectAllItems(e.target.checked)}
                      className="w-5 h-5 text-uber-blue rounded border-gray-300 focus:ring-uber-blue cursor-pointer"
                    />
                    <span className="font-medium text-gray-900">
                      Select All ({cartItems.length})
                    </span>
                  </label>

                  {selectedItems.length > 0 && (
                    <button
                      onClick={handleRemoveSelected}
                      className="text-red-500 hover:text-red-700 flex items-center gap-2 font-medium text-sm transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Selected ({selectedItems.length})
                    </button>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              {/* Delivery Options */}
              <DeliveryOptions />

              {/* Additional Products */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  You might also need
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockProducts
                    .filter((p) => !cartItems.some((item) => item.product.id === p.id))
                    .slice(0, 2)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FleetPartnerCart;
