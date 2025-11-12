import { useStore } from '../../stores/store';
import { formatCurrency } from '../../utils/calculations';

interface BudgetIndicatorProps {
  showDetails?: boolean;
}

const BudgetIndicator = ({ showDetails = true }: BudgetIndicatorProps) => {
  const { budget } = useStore();

  const percentageUsed = (budget.used / budget.total) * 100;
  const percentageRemaining = 100 - percentageUsed;

  const getColorClass = () => {
    if (percentageRemaining > 50) return 'bg-uber-green';
    if (percentageRemaining > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
      {showDetails && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Budget Remaining</span>
          <span className="text-lg font-bold text-white">
            {formatCurrency(budget.remaining)}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getColorClass()}`}
          style={{ width: `${percentageRemaining}%` }}
        />
      </div>

      {showDetails && (
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>
            Used: {formatCurrency(budget.used)}
          </span>
          <span>
            Total: {formatCurrency(budget.total)}
          </span>
        </div>
      )}
    </div>
  );
};

export default BudgetIndicator;
