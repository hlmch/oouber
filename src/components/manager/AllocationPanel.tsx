import { useState } from 'react';
import { DollarSign, AlertTriangle, Send, FileCheck } from 'lucide-react';
import { useStore } from '../../stores/store';
import { mockCostCenters } from '../../utils/mockData';
import {
  formatCurrency,
  calculateSubtotal,
  calculateVAT,
  requiresApproval
} from '../../utils/calculations';

const AllocationPanel = () => {
  const {
    cartItems,
    selectedRecipients,
    budget,
    selectedCostCenter,
    setSelectedCostCenter,
    poReference,
    setPoReference
  } = useStore();

  const [notes, setNotes] = useState('');

  const totalPerRecipient = calculateSubtotal(cartItems);
  const grandTotal = totalPerRecipient * selectedRecipients.length;
  const vat = calculateVAT(grandTotal);
  const totalWithVAT = grandTotal + vat;

  const budgetRemaining = budget.remaining;
  const budgetAfter = budgetRemaining - totalWithVAT;
  const willExceedBudget = budgetAfter < 0;
  const needsApproval = requiresApproval(totalWithVAT);

  const canSubmit =
    selectedRecipients.length > 0 &&
    cartItems.length > 0 &&
    selectedCostCenter !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;

    const orderData = {
      recipients: selectedRecipients,
      items: cartItems,
      costCenter: selectedCostCenter,
      poReference,
      notes,
      total: totalWithVAT,
      requiresApproval: needsApproval
    };

    console.log('Submitting order:', orderData);

    if (needsApproval) {
      alert('Approval request sent to manager');
    } else {
      alert('Order submitted successfully!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Allocation & Funding
        </h2>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* Cost Center Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Funding Source / Cost Center *
          </label>
          <select
            value={selectedCostCenter?.id || ''}
            onChange={(e) => {
              const cc = mockCostCenters.find((c) => c.id === e.target.value);
              setSelectedCostCenter(cc || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none"
          >
            <option value="">Select cost center...</option>
            {mockCostCenters.map((cc) => (
              <option key={cc.id} value={cc.id}>
                {cc.name} ({cc.code})
              </option>
            ))}
          </select>
        </div>

        {/* PO Reference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PO Reference (Optional)
          </label>
          <input
            type="text"
            value={poReference}
            onChange={(e) => setPoReference(e.target.value)}
            placeholder="Enter PO number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special instructions..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none resize-none"
          />
        </div>

        {/* Budget Visualization */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-3">
            Budget Impact
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-4 mb-3 overflow-hidden">
            <div
              className="absolute h-full bg-gray-400"
              style={{ width: `${(budget.used / budget.total) * 100}%` }}
            />
            <div
              className={`absolute h-full ${
                willExceedBudget ? 'bg-red-500' : 'bg-uber-blue'
              }`}
              style={{
                left: `${(budget.used / budget.total) * 100}%`,
                width: `${(totalWithVAT / budget.total) * 100}%`
              }}
            />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Budget Used:</span>
              <span className="font-medium">{formatCurrency(budget.used)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Order:</span>
              <span className="font-medium">{formatCurrency(totalWithVAT)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-300">
              <span className="text-gray-700">Remaining After:</span>
              <span
                className={`font-bold ${
                  willExceedBudget ? 'text-red-500' : 'text-uber-green'
                }`}
              >
                {formatCurrency(budgetAfter)}
              </span>
            </div>
          </div>

          {willExceedBudget && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              This order exceeds available budget
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-medium text-gray-900 mb-3">
            Order Summary
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Recipients:</span>
              <span className="font-medium">{selectedRecipients.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Items per recipient:</span>
              <span className="font-medium">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(grandTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAT (19%):</span>
              <span className="font-medium">{formatCurrency(vat)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-300">
              <span>Total:</span>
              <span className="text-uber-blue">
                {formatCurrency(totalWithVAT)}
              </span>
            </div>
          </div>
        </div>

        {/* Approval Warning */}
        {needsApproval && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-900">
                  Approval Required
                </div>
                <div className="text-xs text-yellow-700 mt-1">
                  Orders over €5,000 require manager approval before processing.
                  This will be sent to your supervisor for review.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Action Buttons */}
      <div className="p-4 border-t-2 border-gray-200 space-y-3">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || willExceedBudget}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {needsApproval ? (
            <>
              <FileCheck className="w-5 h-5" />
              Request Approval
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Order
            </>
          )}
        </button>

        {!canSubmit && (
          <div className="text-xs text-center text-gray-500">
            {selectedRecipients.length === 0 && 'Select recipients • '}
            {cartItems.length === 0 && 'Add products • '}
            {!selectedCostCenter && 'Choose cost center'}
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          All orders are tracked and auditable
        </div>
      </div>
    </div>
  );
};

export default AllocationPanel;
