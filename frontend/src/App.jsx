/**
 * App Component
 * Main application component with two-panel layout
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { useBasicInputsForm } from './hooks/useFormState';

function GroupDesignPage() {
  const {
    formData,
    errors,
    locationData,
    updateFormData,
    updateProjectLocation,
    updateGeometricDetails,
    updateMaterials,
    validateGeometricDetails,
    setLocationDataForDistrict,
    clearLocationData,
  } = useBasicInputsForm();

  const handleStructureTypeChange = (structureType) => {
    updateFormData({ structureType });
    if (structureType !== 'Highway') {
      clearLocationData();
    }
  };

  const handleProjectLocationUpdate = (updates) => {
    updateProjectLocation(updates);
  };

  const handleLocationLoad = (district) => {
    setLocationDataForDistrict(district);
  };

  const handleGeometricDetailsUpdate = (updates) => {
    updateGeometricDetails(updates);
    // Validate on change
    validateGeometricDetails();
  };

  const handleMaterialsUpdate = (updates) => {
    updateMaterials(updates);
  };

  const handleGeometryModalSave = (data) => {
    // Save geometry data to form
    console.log('Geometry data saved:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen flex">
        {/* Left Panel - Inputs */}
        <div className="w-full md:w-1/2 overflow-hidden">
          <LeftPanel
            formData={formData}
            errors={errors}
            locationData={locationData}
            onStructureTypeChange={handleStructureTypeChange}
            onProjectLocationUpdate={handleProjectLocationUpdate}
            onLocationLoad={handleLocationLoad}
            onGeometricDetailsUpdate={handleGeometricDetailsUpdate}
            onMaterialsUpdate={handleMaterialsUpdate}
            onGeometryModalSave={handleGeometryModalSave}
            carriageWayWidth={formData.geometricDetails.carriageWayWidth}
          />
        </div>

        {/* Right Panel - Visual Reference (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 overflow-hidden">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/group-design" element={<GroupDesignPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
