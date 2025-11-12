import { ShoppingCart, User } from 'lucide-react';
import { useStore } from '../../stores/store';
import { useNavigate } from 'react-router-dom';
import BudgetIndicator from './BudgetIndicator';

const Header = () => {
  const { user, cartItems } = useStore();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-2xl font-bold">UBER</div>
            <div className="ml-3 text-sm text-gray-300">Partner Shop</div>
          </div>

          {/* Center - Budget Indicator (only for logged-in users) */}
          {user && user.role === 'fleet_partner' && (
            <div className="hidden md:block">
              <BudgetIndicator />
            </div>
          )}

          {/* Right - User Info & Cart */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* Cart Icon */}
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2 hover:bg-gray-800 rounded-lg transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-uber-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.companyName}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Budget Indicator */}
        {user && user.role === 'fleet_partner' && (
          <div className="md:hidden pb-3">
            <BudgetIndicator />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
