import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ShoppingBag, Users, Lock } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const ShopSelector = () => {
  const navigate = useNavigate();
  const { user, budget } = useStore();

  if (!user) {
    navigate('/');
    return null;
  }

  const shopOptions = [
    {
      id: 'fleet',
      title: 'Fleet Partner Shop',
      description: 'Order products with subsidized pricing for your fleet',
      icon: ShoppingBag,
      enabled: user.role === 'fleet_partner',
      route: '/cart',
      badge: user.role === 'fleet_partner' ? formatCurrency(budget.remaining) : null,
      badgeLabel: 'Available Budget',
      color: 'uber-blue'
    },
    {
      id: 'management',
      title: 'Management Shop',
      description: 'Send products to multiple partners and fleet managers',
      icon: Users,
      enabled: user.role === 'manager' || user.role === 'poc',
      route: '/manager-send',
      badge: null,
      color: 'uber-green'
    },
    {
      id: 'public',
      title: 'Public Shop',
      description: 'Browse our public catalog (coming soon)',
      icon: Lock,
      enabled: false,
      route: '#',
      badge: 'Coming Soon',
      color: 'gray-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-300 mt-1">Select a shop to continue</p>
        </div>
      </div>

      {/* Shop Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {shopOptions.map((shop) => {
            const Icon = shop.icon;
            const isEnabled = shop.enabled;

            return (
              <motion.div
                key={shop.id}
                variants={cardVariants}
                whileHover={isEnabled ? { y: -8, scale: 1.02 } : {}}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
                  isEnabled
                    ? 'border-transparent hover:border-uber-blue cursor-pointer'
                    : 'border-gray-200 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isEnabled && navigate(shop.route)}
              >
                {/* Badge */}
                {shop.badge && (
                  <div className={`absolute top-4 right-4 ${
                    shop.badgeLabel
                      ? 'bg-uber-green text-white px-3 py-1'
                      : 'bg-gray-200 text-gray-600 px-3 py-1'
                  } rounded-full text-xs font-semibold`}>
                    {shop.badge}
                  </div>
                )}

                {/* Icon */}
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-${shop.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-8 h-8 text-${shop.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {shop.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {shop.description}
                  </p>

                  {shop.badgeLabel && shop.badge && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">{shop.badgeLabel}</div>
                      <div className="text-2xl font-bold text-uber-green mt-1">
                        {shop.badge}
                      </div>
                    </div>
                  )}

                  {!isEnabled && (
                    <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                      <Lock className="w-4 h-4" />
                      <span>Not available for your role</span>
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                {isEnabled && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-uber-blue to-uber-green transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-lg shadow p-6"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Your Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Role</div>
              <div className="font-medium capitalize">
                {user.role.replace('_', ' ')}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Company</div>
              <div className="font-medium">{user.companyName}</div>
            </div>
            {user.territory && (
              <div>
                <div className="text-gray-500">Territory</div>
                <div className="font-medium">{user.territory}</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopSelector;
