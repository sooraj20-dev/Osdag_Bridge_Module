/**
 * GeometricDetailsSection Component
 * Handles span, width, footpath, skew angle with validations
 * Integrates with Django REST API for geometry validation
 */

import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { footpathOptions } from '../data/mockApi';
import apiService from '../services/api';

const GeometricDetailsSection = ({
  geometricDetails,
  onUpdate,
  errors,
  disabled = false,
  onModifyGeometry,
}) => {
  const [validationMessage, setValidationMessage] = useState('');
  const [validationLoading, setValidationLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(null);

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const result = await apiService.checkBackendConnection();
      setBackendAvailable(result.connected);
    };
    checkConnection();
  }, []);

  // Auto-validate geometry when fields change
  useEffect(() => {
    const validateGeometry = async () => {
      // Need minimum fields to validate
      if (
        !geometricDetails.carriageWayWidth ||
        !geometricDetails.span
      ) {
        setValidationMessage('');
        return;
      }

      if (!backendAvailable) {
        setValidationMessage('');
        return;
      }

      setValidationLoading(true);
      try {
        const geometryData = {
          carriageway_width: parseFloat(geometricDetails.carriageWayWidth),
          girder_spacing: geometricDetails.girderSpacing ? parseFloat(geometricDetails.girderSpacing) : 2.5,
          num_girders: geometricDetails.numGirders ? parseInt(geometricDetails.numGirders) : 4,
          deck_overhang_width: geometricDetails.deckOverhangWidth ? parseFloat(geometricDetails.deckOverhangWidth) : 1.0,
        };

        const result = await apiService.validateGeometry(geometryData);
        if (result.valid) {
          setValidationMessage(
            `✓ Geometry Valid (Overall Width: ${result.data.overall_width}m)`
          );
        } else {
          setValidationMessage(
            `✗ Invalid: ${result.data.errors?.[0] || result.error}`
          );
        }
      } catch (error) {
        // Silent fail - validation is optional
        setValidationMessage('');
      } finally {
        setValidationLoading(false);
      }
    };

    // Debounce validation
    const timer = setTimeout(validateGeometry, 1000);
    return () => clearTimeout(timer);
  }, [
    geometricDetails.carriageWayWidth,
    geometricDetails.girderSpacing,
    geometricDetails.numGirders,
    geometricDetails.deckOverhangWidth,
    backendAvailable,
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Geometric Details</h3>

      {validationMessage && (
        <div className={`p-3 rounded text-sm font-medium ${
          validationMessage.startsWith('✓')
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {validationMessage}
          {validationLoading && ' (validating...)'}
        </div>
      )}

      <InputField
        label="Span (m)"
        id="span"
        type="number"
        value={geometricDetails.span}
        onChange={(e) => onUpdate({ span: e.target.value })}
        error={errors.span}
        placeholder="e.g., 30"
        disabled={disabled}
        required
        helperText="Valid range: 20-45 m"
        step="0.1"
      />

      <InputField
        label="Carriageway Width (m)"
        id="carriageway-width"
        type="number"
        value={geometricDetails.carriageWayWidth}
        onChange={(e) => onUpdate({ carriageWayWidth: e.target.value })}
        error={errors.carriageWayWidth}
        placeholder="e.g., 7.5"
        disabled={disabled}
        required
        helperText="Valid range: 4.25-24 m"
        step="0.1"
      />

      <SelectField
        label="Footpath"
        id="footpath"
        value={geometricDetails.footpath}
        onChange={(e) => onUpdate({ footpath: e.target.value })}
        options={footpathOptions}
        disabled={disabled}
        required
      />

      <InputField
        label="Skew Angle (°)"
        id="skew-angle"
        type="number"
        value={geometricDetails.skewAngle}
        onChange={(e) => onUpdate({ skewAngle: e.target.value })}
        error={errors.skewAngle}
        placeholder="e.g., 0"
        disabled={disabled}
        helperText="Valid range: ±15°"
        step="0.1"
      />

      <button
        onClick={onModifyGeometry}
        disabled={disabled}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
      >
        Modify Additional Geometry
      </button>
    </div>
  );
};

export default GeometricDetailsSection;
