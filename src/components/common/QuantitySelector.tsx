import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 999,
  size = 'md'
}: QuantitySelectorProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  };

  const buttonClass = sizeClasses[size];

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${buttonClass} flex items-center justify-center bg-white rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition`}
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="min-w-[2rem] text-center font-medium">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${buttonClass} flex items-center justify-center bg-white rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition`}
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

export default QuantitySelector;
