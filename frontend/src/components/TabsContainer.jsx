/**
 * TabsContainer Component
 * Reusable tabs component
 */

import React from 'react';

const TabsContainer = ({ tabs, activeTabId, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-2 md:space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-2 md:px-4 border-b-2 font-medium transition-colors ${
              activeTabId === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            aria-selected={activeTabId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsContainer;
