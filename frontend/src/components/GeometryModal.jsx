/**
 * GeometryModal Component
 * Modal for entering additional geometric details with auto-calculation
 */

import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const GeometryModal = ({
  isOpen,
  onClose,
  onSave,
  carriageWayWidth,
}) => {
  const [geometryData, setGeometryData] = useState({
    spacing: '',
    numGirders: '',
    overhang: '',
  });

  const [errors, setErrors] = useState([]);
  const [overallWidth, setOverallWidth] = useState(0);

  // Calculate overall width when component mounts or carriageWayWidth changes
  useEffect(() => {
    if (carriageWayWidth) {
      setOverallWidth(parseFloat(carriageWayWidth) + 5);
    }
  }, [carriageWayWidth]);

  const validateGeometry = (spacing, overhang, numGirders) => {
    const newErrors = [];

    if (!overallWidth) {
      newErrors.push('Carriageway Width is required to validate geometry');
      return newErrors;
    }

    // Validate spacing
    if (spacing && parseFloat(spacing) >= overallWidth) {
      newErrors.push(
        `Girder Spacing (${spacing}) must be < Overall Width (${overallWidth.toFixed(2)})`
      );
    }

    // Validate overhang
    if (overhang && parseFloat(overhang) >= overallWidth) {
      newErrors.push(
        `Deck Overhang (${overhang}) must be < Overall Width (${overallWidth.toFixed(2)})`
      );
    }

    // Validate formula: (Overall Width - Overhang) / Spacing = No. of Girders
    if (spacing && overhang && numGirders) {
      const numSpacing = parseFloat(spacing);
      const numOverhang = parseFloat(overhang);
      const numGirdersNum = parseInt(numGirders, 10);
      const calculatedGirders = (overallWidth - numOverhang) / numSpacing;

      if (Math.abs(calculatedGirders - numGirdersNum) > 0.01) {
        newErrors.push(
          `Geometry mismatch: (Overall Width - Overhang) / Spacing should equal No. of Girders. ` +
          `Expected: ${calculatedGirders.toFixed(2)}, Got: ${numGirdersNum}`
        );
      }
    }

    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    if (value === '') {
      setGeometryData({ ...geometryData, [field]: '' });
      return;
    }

    const numValue = field === 'numGirders' ? parseInt(value, 10) : parseFloat(value);

    if (isNaN(numValue)) return;

    const updated = { ...geometryData, [field]: value };

    // Auto-calculate based on which field changed
    if (field === 'spacing' && geometryData.numGirders) {
      const calculatedOverhang = overallWidth - parseFloat(value) * parseInt(geometryData.numGirders, 10);
      updated.overhang = calculatedOverhang.toFixed(1);
    } else if (field === 'numGirders' && geometryData.spacing) {
      const calculatedOverhang = overallWidth - parseFloat(geometryData.spacing) * parseInt(value, 10);
      updated.overhang = calculatedOverhang.toFixed(1);
    } else if (field === 'overhang' && geometryData.spacing) {
      const calculatedGirders = Math.round((overallWidth - parseFloat(value)) / parseFloat(geometryData.spacing));
      updated.numGirders = calculatedGirders;
    }

    setGeometryData(updated);

    // Validate
    const newErrors = validateGeometry(updated.spacing, updated.overhang, updated.numGirders);
    setErrors(newErrors);
  };

  const handleSave = () => {
    const newErrors = validateGeometry(
      geometryData.spacing,
      geometryData.overhang,
      geometryData.numGirders
    );

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      spacing: parseFloat(geometryData.spacing),
      numGirders: parseInt(geometryData.numGirders, 10),
      overhang: parseFloat(geometryData.overhang),
    });

    handleClose();
  };

  const handleClose = () => {
    setGeometryData({ spacing: '', numGirders: '', overhang: '' });
    setErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Additional Geometric Details
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Overall Width = Carriageway Width + 5 = {overallWidth.toFixed(2)} m
        </p>

        <InputField
          label="Girder Spacing (m)"
          id="geometry-spacing"
          type="number"
          value={geometryData.spacing}
          onChange={(e) => handleFieldChange('spacing', e.target.value)}
          placeholder="e.g., 2.5"
          helperText="Must be < Overall Width"
          step="0.1"
        />

        <InputField
          label="Number of Girders"
          id="geometry-num-girders"
          type="number"
          value={geometryData.numGirders}
          onChange={(e) => handleFieldChange('numGirders', e.target.value)}
          placeholder="e.g., 5"
          helperText="Integer value"
        />

        <InputField
          label="Deck Overhang Width (m)"
          id="geometry-overhang"
          type="number"
          value={geometryData.overhang}
          onChange={(e) => handleFieldChange('overhang', e.target.value)}
          placeholder="e.g., 1.5"
          helperText="Must be < Overall Width"
          step="0.1"
        />

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm font-semibold text-red-800 mb-2">Validation Errors:</p>
            <ul className="space-y-1">
              {errors.map((error, idx) => (
                <li key={idx} className="text-sm text-red-700">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Save
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeometryModal;
