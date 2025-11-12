import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { useStore } from '../../stores/store';
import QuantitySelector from '../common/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart, toggleItemSelection } = useStore();

  const { product, quantity, selected } = item;
  const savings = (product.price - product.subsidizedPrice) * quantity;
  const itemTotal = product.subsidizedPrice * quantity;

  return (
    <div className={`bg-white rounded-lg border-2 p-4 transition ${
      selected ? 'border-uber-blue' : 'border-gray-200'
    }`}>
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleItemSelection(product.id)}
            className="w-5 h-5 text-uber-blue rounded border-gray-300 focus:ring-uber-blue cursor-pointer"
          />
        </div>

        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Pricing */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-uber-blue">
                {formatCurrency(product.subsidizedPrice)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.price)}
              </span>
            </div>
            <div className="text-xs text-uber-green font-medium">
              You save {formatCurrency(savings)}
            </div>
          </div>

          {/* Quantity and Total */}
          <div className="flex items-center justify-between">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => updateQuantity(product.id, quantity + 1)}
              onDecrease={() => updateQuantity(product.id, quantity - 1)}
            />

            <div className="text-right">
              <div className="text-sm text-gray-500">Item Total</div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(itemTotal)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
