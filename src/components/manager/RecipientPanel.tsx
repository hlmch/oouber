import { useState } from 'react';
import { Search, X, Upload, Users } from 'lucide-react';
import { useStore } from '../../stores/store';
import { mockRecipients } from '../../utils/mockData';
import type { Recipient } from '../../types';

const RecipientPanel = () => {
  const { selectedRecipients, addRecipient, removeRecipient, clearRecipients, setRecipients } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTerritory, setFilterTerritory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const territories = Array.from(new Set(mockRecipients.map((r) => r.territory)));

  const filteredRecipients = mockRecipients.filter((recipient) => {
    const matchesSearch =
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTerritory =
      filterTerritory === 'all' || recipient.territory === filterTerritory;

    const matchesType = filterType === 'all' || recipient.type === filterType;

    return matchesSearch && matchesTerritory && matchesType;
  });

  const isSelected = (recipientId: string) =>
    selectedRecipients.some((r) => r.id === recipientId);

  const toggleRecipient = (recipient: Recipient) => {
    if (isSelected(recipient.id)) {
      removeRecipient(recipient.id);
    } else {
      addRecipient(recipient);
    }
  };

  const handleSelectAll = () => {
    if (selectedRecipients.length === filteredRecipients.length) {
      clearRecipients();
    } else {
      setRecipients(filteredRecipients);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recipients
          </h2>
          <span className="bg-uber-blue text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedRecipients.length} selected
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={filterTerritory}
            onChange={(e) => setFilterTerritory(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none text-sm"
          >
            <option value="all">All Territories</option>
            {territories.map((territory) => (
              <option key={territory} value={territory}>
                {territory}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-blue focus:border-transparent outline-none text-sm"
          >
            <option value="all">All Types</option>
            <option value="fleet_partner">Fleet Partner</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Bulk Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSelectAll}
            className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            {selectedRecipients.length === filteredRecipients.length
              ? 'Deselect All'
              : 'Select All'}
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            CSV Upload
          </button>
        </div>
      </div>

      {/* Selected Recipients Pills */}
      {selectedRecipients.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div className="text-xs font-medium text-gray-700 mb-2">
            Selected Recipients
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedRecipients.map((recipient) => (
              <div
                key={recipient.id}
                className="bg-white border border-uber-blue text-gray-900 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                <span>{recipient.name}</span>
                <button
                  onClick={() => removeRecipient(recipient.id)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipients List */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4 space-y-2">
          {filteredRecipients.map((recipient) => (
            <label
              key={recipient.id}
              className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${
                isSelected(recipient.id)
                  ? 'border-uber-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected(recipient.id)}
                onChange={() => toggleRecipient(recipient)}
                className="mt-1 text-uber-blue focus:ring-uber-blue rounded"
              />
              <div className="flex-grow">
                <div className="font-medium text-gray-900">{recipient.name}</div>
                <div className="text-sm text-gray-600">{recipient.email}</div>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                    {recipient.territory}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded capitalize">
                    {recipient.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </label>
          ))}

          {filteredRecipients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No recipients found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipientPanel;
