import { motion } from 'framer-motion';
import { ShoppingCart, Tag } from 'lucide-react';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { useStore } from '../../stores/store';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard = ({ product, showAddToCart = true }: ProductCardProps) => {
  const { addToCart } = useStore();

  const savings = product.price - product.subsidizedPrice;
  const savingsPercentage = Math.round((savings / product.price) * 100);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {savingsPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-uber-green text-white px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {savingsPercentage}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.sku}</div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-uber-blue">
              {formatCurrency(product.subsidizedPrice)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.price)}
            </span>
          </div>
          <div className="text-xs text-uber-green font-medium mt-1">
            You save {formatCurrency(savings)}
          </div>
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
              product.inStock
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
