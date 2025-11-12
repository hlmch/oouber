import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ChevronRight } from 'lucide-react';
import { useStore } from '../../stores/store';
import {
  calculateSubtotal,
  calculateVAT,
  calculateTotal,
  calculateTotalSavings,
  calculateBudgetImpact,
  formatCurrency,
  requiresApproval
} from '../../utils/calculations';

const CartSummary = () => {
  const { cartItems, budget, promoCode, setPromoCode, selectedCostCenter } = useStore();
  const [promoInput, setPromoInput] = useState('');

  const subtotal = calculateSubtotal(cartItems);
  const totalSavings = calculateTotalSavings(cartItems);
  const vat = calculateVAT(subtotal);
  const total = calculateTotal(cartItems, promoCode || undefined);

  const budgetImpact = calculateBudgetImpact(budget.used, total, budget.total);
  const needsApproval = requiresApproval(total);

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoInput.toLowerCase() === 'save10') {
      setPromoCode({
        code: 'SAVE10',
        discount: 10,
        type: 'percentage'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subsidy Savings</span>
          <span className="font-medium text-uber-green">
            -{formatCurrency(totalSavings)}
          </span>
        </div>

        {promoCode && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Promo ({promoCode.code})</span>
            <span className="font-medium text-uber-green">
              -{formatCurrency(promoCode.discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT (19%)</span>
          <span className="font-medium">{formatCurrency(vat)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span className="text-uber-blue">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Budget Impact */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Budget Impact
        </div>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="absolute h-full bg-gray-400 transition-all"
            style={{ width: `${(budget.used / budget.total) * 100}%` }}
          />
          <div
            className={`absolute h-full transition-all ${
              budgetImpact.willExceedBudget ? 'bg-red-500' : 'bg-uber-blue'
            }`}
            style={{
              left: `${(budget.used / budget.total) * 100}%`,
              width: `${(total / budget.total) * 100}%`
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Current: {formatCurrency(budget.used)}</span>
          <span>After: {formatCurrency(budgetImpact.newUsed)}</span>
        </div>

        <div className="mt-2 text-sm">
          <span className="text-gray-600">Remaining: </span>
          <span className={`font-bold ${
            budgetImpact.willExceedBudget ? 'text-red-500' : 'text-uber-green'
          }`}>
            {formatCurrency(budgetImpact.newRemaining)}
          </span>
        </div>

        {budgetImpact.willExceedBudget && (
          <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
            Warning: This order exceeds your available budget
          </div>
        )}
      </div>

      {/* Cost Center */}
      {selectedCostCenter && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <div className="text-gray-600">Cost Center</div>
          <div className="font-medium">{selectedCostCenter.name}</div>
          <div className="text-xs text-gray-500">{selectedCostCenter.code}</div>
        </div>
      )}

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter code"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none text-sm"
          />
          <button
            onClick={applyPromoCode}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            <Tag className="w-4 h-4" />
          </button>
        </div>
        {promoCode && (
          <div className="mt-2 text-xs text-uber-green">
            ✓ {promoCode.code} applied
          </div>
        )}
        <div className="mt-1 text-xs text-gray-500">
          Try: SAVE10
        </div>
      </div>

      {/* Approval Warning */}
      {needsApproval && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
          <div className="font-medium text-yellow-800">Approval Required</div>
          <div className="text-xs text-yellow-700 mt-1">
            Orders over €5,000 require manager approval
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        disabled={cartItems.length === 0 || budgetImpact.willExceedBudget}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        {needsApproval ? 'Request Approval' : 'Proceed to Checkout'}
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Secure checkout • Free shipping on orders over €100
      </div>
    </div>
  );
};

export default CartSummary;
