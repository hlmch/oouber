import { useState } from 'react';
import { Package, Calculator } from 'lucide-react';
import { useStore } from '../../stores/store';
import { mockProducts, mockTemplates } from '../../utils/mockData';
import { formatCurrency } from '../../utils/calculations';
import QuantitySelector from '../common/QuantitySelector';

const ProductPanel = () => {
  const { cartItems, addToCart, updateQuantity, selectedRecipients } = useStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [bulkQuantity, setBulkQuantity] = useState<number>(1);

  const applyTemplate = (templateId: string) => {
    const template = mockTemplates.find((t) => t.id === templateId);
    if (!template) return;

    template.products.forEach((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      if (product) {
        addToCart(product, item.quantity);
      }
    });

    setSelectedTemplate(templateId);
  };

  const applyBulkQuantity = () => {
    cartItems.forEach((item) => {
      updateQuantity(item.product.id, bulkQuantity);
    });
  };

  const totalPerRecipient = cartItems.reduce(
    (sum, item) => sum + item.product.subsidizedPrice * item.quantity,
    0
  );

  const grandTotal = totalPerRecipient * selectedRecipients.length;

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
          <Package className="w-5 h-5" />
          Products
        </h2>

        {/* Template Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apply Template
          </label>
          <div className="flex gap-2">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none text-sm"
            >
              <option value="">Select a template...</option>
              {mockTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => selectedTemplate && applyTemplate(selectedTemplate)}
              disabled={!selectedTemplate}
              className="px-4 py-2 bg-uber-blue text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm font-medium"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Bulk Quantity Calculator */}
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Bulk Quantity per Recipient
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={bulkQuantity}
              onChange={(e) => setBulkQuantity(Number(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none text-sm"
              placeholder="Quantity"
            />
            <button
              onClick={applyBulkQuantity}
              disabled={cartItems.length === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm font-medium"
            >
              Set All
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3">
          {mockProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.product.id === product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div
                key={product.id}
                className="border-2 border-gray-200 rounded-lg p-3 hover:border-gray-300 transition"
              >
                <div className="flex gap-3">
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {product.name}
                    </h4>
                    <div className="text-xs text-gray-500 mb-2">{product.sku}</div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-uber-blue">
                          {formatCurrency(product.subsidizedPrice)}
                        </span>
                        <span className="text-xs text-gray-500 line-through ml-2">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-3 py-1 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 transition"
                        >
                          Add
                        </button>
                      ) : (
                        <QuantitySelector
                          quantity={quantity}
                          onIncrease={() => updateQuantity(product.id, quantity + 1)}
                          onDecrease={() => {
                            if (quantity === 1) {
                              // Remove from cart
                              updateQuantity(product.id, 0);
                            } else {
                              updateQuantity(product.id, quantity - 1);
                            }
                          }}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Running Total */}
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Items per recipient:</span>
            <span className="font-medium">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost per recipient:</span>
            <span className="font-medium">{formatCurrency(totalPerRecipient)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Recipients:</span>
            <span className="font-medium">{selectedRecipients.length}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
            <span>Grand Total:</span>
            <span className="text-uber-blue">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
