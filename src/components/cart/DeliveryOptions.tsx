import { MapPin, Plus } from 'lucide-react';
import { useStore } from '../../stores/store';
import { mockAddresses } from '../../utils/mockData';
import type { DeliveryMode } from '../../types';

const DeliveryOptions = () => {
  const {
    deliveryMode,
    setDeliveryMode,
    selectedAddressId,
    setSelectedAddressId,
    deliveryAllocations,
    setDeliveryAllocations
  } = useStore();

  const handleModeChange = (mode: DeliveryMode) => {
    setDeliveryMode(mode);
    if (mode === 'single') {
      setDeliveryAllocations([]);
    } else {
      // Initialize allocations for multiple addresses
      const allocations = mockAddresses.slice(0, 2).map((addr) => ({
        addressId: addr.id,
        percentage: 50
      }));
      setDeliveryAllocations(allocations);
    }
  };

  const updateAllocation = (addressId: string, percentage: number) => {
    setDeliveryAllocations(
      deliveryAllocations.map((alloc) =>
        alloc.addressId === addressId ? { ...alloc, percentage } : alloc
      )
    );
  };

  const totalAllocation = deliveryAllocations.reduce(
    (sum, alloc) => sum + alloc.percentage,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Options</h2>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleModeChange('single')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            deliveryMode === 'single'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Single Location
        </button>
        <button
          onClick={() => handleModeChange('multiple')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            deliveryMode === 'multiple'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Multiple Locations
        </button>
      </div>

      {/* Single Location Mode */}
      {deliveryMode === 'single' && (
        <div className="space-y-3">
          {mockAddresses.map((address) => (
            <label
              key={address.id}
              className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedAddressId === address.id
                  ? 'border-uber-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="address"
                checked={selectedAddressId === address.id}
                onChange={() => setSelectedAddressId(address.id)}
                className="mt-1 text-uber-blue focus:ring-uber-blue"
              />
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {address.label}
                  </span>
                  {address.isDefault && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {address.street}, {address.city}, {address.postalCode}
                </div>
              </div>
            </label>
          ))}

          <button
            onClick={() => alert('Add address functionality would open a modal')}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-uber-blue hover:text-uber-blue transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        </div>
      )}

      {/* Multiple Locations Mode */}
      {deliveryMode === 'multiple' && (
        <div>
          <div className="mb-4 text-sm text-gray-600">
            Allocate quantities across multiple locations
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700">
                    Location
                  </th>
                  <th className="text-right p-3 font-medium text-gray-700">
                    Allocation %
                  </th>
                </tr>
              </thead>
              <tbody>
                {deliveryAllocations.map((allocation) => {
                  const address = mockAddresses.find(
                    (a) => a.id === allocation.addressId
                  );
                  if (!address) return null;

                  return (
                    <tr key={allocation.addressId} className="border-t">
                      <td className="p-3">
                        <div className="font-medium">{address.label}</div>
                        <div className="text-xs text-gray-500">
                          {address.city}
                        </div>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={allocation.percentage}
                          onChange={(e) =>
                            updateAllocation(
                              allocation.addressId,
                              Number(e.target.value)
                            )
                          }
                          className="w-20 text-right px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none"
                        />
                        <span className="ml-1">%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="border-t-2 border-gray-300">
                <tr>
                  <td className="p-3 font-medium">Total</td>
                  <td className="p-3 text-right">
                    <span
                      className={`font-bold ${
                        totalAllocation === 100
                          ? 'text-uber-green'
                          : 'text-red-500'
                      }`}
                    >
                      {totalAllocation}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {totalAllocation !== 100 && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              Total allocation must equal 100%
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
