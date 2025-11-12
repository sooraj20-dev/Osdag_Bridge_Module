/**
 * LeftPanel Component
 * Contains all input tabs and forms
 */

import React, { useState } from 'react';
import TabsContainer from './TabsContainer';
import BasicInputsTab from './BasicInputsTab';
import AdditionalInputsTab from './AdditionalInputsTab';
import GeometryModal from './GeometryModal';

const LeftPanel = ({
  formData,
  errors,
  locationData,
  onStructureTypeChange,
  onProjectLocationUpdate,
  onLocationLoad,
  onGeometricDetailsUpdate,
  onMaterialsUpdate,
  onGeometryModalSave,
  carriageWayWidth,
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [geometryModalOpen, setGeometryModalOpen] = useState(false);

  const tabs = [
    { id: 'basic', label: 'Basic Inputs' },
    { id: 'additional', label: 'Additional Inputs' },
  ];

  const handleModifyGeometry = () => {
    setGeometryModalOpen(true);
  };

  const handleGeometryModalSave = (data) => {
    onGeometryModalSave(data);
    setGeometryModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Group Design</h1>
        <p className="text-sm text-gray-600 mt-1">Bridge Screening Module</p>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <TabsContainer
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {activeTab === 'basic' && (
          <BasicInputsTab
            formData={formData}
            errors={errors}
            locationData={locationData}
            onStructureTypeChange={onStructureTypeChange}
            onProjectLocationUpdate={onProjectLocationUpdate}
            onLocationLoad={onLocationLoad}
            onGeometricDetailsUpdate={onGeometricDetailsUpdate}
            onMaterialsUpdate={onMaterialsUpdate}
            onModifyGeometry={handleModifyGeometry}
          />
        )}

        {activeTab === 'additional' && <AdditionalInputsTab />}
      </div>

      {/* Geometry Modal */}
      <GeometryModal
        isOpen={geometryModalOpen}
        onClose={() => setGeometryModalOpen(false)}
        onSave={handleGeometryModalSave}
        carriageWayWidth={carriageWayWidth}
      />
    </div>
  );
};

export default LeftPanel;
