/**
 * BasicInputsTab Component
 * Main tab with all basic input fields
 */

import React from 'react';
import SelectField from './SelectField';
import ProjectLocationSection from './ProjectLocationSection';
import GeometricDetailsSection from './GeometricDetailsSection';
import MaterialInputsSection from './MaterialInputsSection';
import { structureTypes } from '../data/mockApi';

const BasicInputsTab = ({
  formData,
  errors,
  locationData,
  onStructureTypeChange,
  onProjectLocationUpdate,
  onLocationLoad,
  onGeometricDetailsUpdate,
  onMaterialsUpdate,
  onModifyGeometry,
}) => {
  const isOtherStructure = formData.structureType === 'Other';
  const structureTypeOptions = structureTypes.map((type) => ({
    id: type,
    name: type,
  }));

  return (
    <div className="space-y-6">
      {/* Type of Structure */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <SelectField
          label="Type of Structure"
          id="structure-type"
          value={formData.structureType}
          onChange={(e) => onStructureTypeChange(e.target.value)}
          options={structureTypeOptions}
          required
        />
        {isOtherStructure && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800 font-medium">
              ⚠️ Other structures not included.
            </p>
          </div>
        )}
      </div>

      {/* Remaining inputs disabled if "Other" is selected */}
      {!isOtherStructure && (
        <>
          {/* Project Location */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <ProjectLocationSection
              formData={formData.projectLocation}
              onUpdate={onProjectLocationUpdate}
              locationDisplayData={locationData}
              onLocationLoad={onLocationLoad}
            />
          </div>

          {/* Geometric Details */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <GeometricDetailsSection
              geometricDetails={formData.geometricDetails}
              onUpdate={onGeometricDetailsUpdate}
              errors={errors}
              onModifyGeometry={onModifyGeometry}
            />
          </div>

          {/* Material Inputs */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <MaterialInputsSection
              materials={formData.materials}
              onUpdate={onMaterialsUpdate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BasicInputsTab;
