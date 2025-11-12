import { useState } from 'react';
import { Users, Package, DollarSign } from 'lucide-react';
import Header from '../components/common/Header';
import RecipientPanel from '../components/manager/RecipientPanel';
import ProductPanel from '../components/manager/ProductPanel';
import AllocationPanel from '../components/manager/AllocationPanel';

type TabView = 'recipients' | 'products' | 'allocation';

const ManagerSend = () => {
  const [activeTab, setActiveTab] = useState<TabView>('recipients');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Send to Multiple Recipients
          </h1>
          <p className="text-gray-600 mt-1">
            Select recipients, choose products, and allocate funding
          </p>
        </div>

        {/* Desktop: Three Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          <RecipientPanel />
          <ProductPanel />
          <AllocationPanel />
        </div>

        {/* Tablet/Mobile: Tabbed Interface */}
        <div className="lg:hidden">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('recipients')}
                className={`flex-1 py-4 px-4 font-medium text-sm flex items-center justify-center gap-2 transition ${
                  activeTab === 'recipients'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Recipients</span>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-4 px-4 font-medium text-sm flex items-center justify-center gap-2 transition ${
                  activeTab === 'products'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Products</span>
              </button>
              <button
                onClick={() => setActiveTab('allocation')}
                className={`flex-1 py-4 px-4 font-medium text-sm flex items-center justify-center gap-2 transition ${
                  activeTab === 'allocation'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-5 h-5" />
                <span>Allocation</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="h-[calc(100vh-16rem)]">
            {activeTab === 'recipients' && <RecipientPanel />}
            {activeTab === 'products' && <ProductPanel />}
            {activeTab === 'allocation' && <AllocationPanel />}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-2 lg:hidden">
            {activeTab === 'recipients' && (
              <button
                onClick={() => setActiveTab('products')}
                className="flex-1 bg-black text-white py-3 rounded-lg font-semibold"
              >
                Next: Products →
              </button>
            )}
            {activeTab === 'products' && (
              <>
                <button
                  onClick={() => setActiveTab('recipients')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setActiveTab('allocation')}
                  className="flex-1 bg-black text-white py-3 rounded-lg font-semibold"
                >
                  Next: Allocation →
                </button>
              </>
            )}
            {activeTab === 'allocation' && (
              <button
                onClick={() => setActiveTab('products')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSend;
