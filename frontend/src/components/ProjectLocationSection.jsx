/**
 * ProjectLocationSection Component
 * Handles two modes: Location Name selection or Custom Loading Parameters
 * Integrates with Django REST API for location and geometry data
 */

import React, { useState, useEffect } from 'react';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import LocationDisplay from './LocationDisplay';
import CustomLoadingModal from './CustomLoadingModal';
import { locationData } from '../data/mockApi';
import apiService from '../services/api';

const ProjectLocationSection = ({
  formData,
  onUpdate,
  disabled = false,
  locationDisplayData,
  onLocationLoad,
}) => {
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [backendAvailable, setBackendAvailable] = useState(null);

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const result = await apiService.checkBackendConnection();
      setBackendAvailable(result.connected);
    };
    checkConnection();
  }, []);

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    onUpdate({ mode: newMode });
    if (newMode === 'location') {
      // Clear custom data when switching to location mode
      onUpdate({
        state: '',
        district: '',
        windSpeed: '',
        seismicZone: '',
        seismicFactor: '',
        minTemp: '',
        maxTemp: '',
      });
      setApiError('');
    }
  };

  const handleStateChange = (e) => {
    onUpdate({ state: e.target.value, district: '' });
    setApiError('');
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    onUpdate({ district: districtId });
    setApiError('');

    if (!districtId) return;

    // First try backend API
    if (backendAvailable) {
      setLoading(true);
      try {
        // Find state name for API call
        const state = locationData.states.find((s) => s.id === formData.state);
        const district = state?.districts.find((d) => d.id === districtId);

        if (state && district) {
          const result = await apiService.getLocationByStateDistrict(
            state.name,
            district.name
          );

          if (result.success && result.data) {
            // Convert API response to match our format
            const apiLocationData = {
              basicWindSpeed: result.data.basic_wind_speed,
              seismicZone: result.data.seismic_zone,
              seismicFactor: result.data.seismic_factor,
              minTemp: result.data.temperature_min,
              maxTemp: result.data.temperature_max,
              state: state.name,
              stateId: state.id,
              name: district.name,
            };
            onLocationLoad(apiLocationData);
            return;
          } else {
            setApiError(
              result.error || 'Failed to fetch location from backend'
            );
          }
        }
      } catch (error) {
        setApiError('Error connecting to backend: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    // Fallback to mock data if backend unavailable
    for (const state of locationData.states) {
      const district = state.districts.find((d) => d.id === districtId);
      if (district) {
        onLocationLoad({
          ...district,
          state: state.name,
          stateId: state.id,
        });
        return;
      }
    }
  };

  const handleCustomSave = async (parameters) => {
    setApiError('');
    
    // Try to save to backend if available
    if (backendAvailable) {
      setLoading(true);
      try {
        const result = await apiService.saveCustomParameters(parameters);
        if (!result.success) {
          setApiError('Warning: Backend save failed, saved locally');
        }
      } catch (error) {
        setApiError('Local save successful, backend save failed');
      } finally {
        setLoading(false);
      }
    }

    onUpdate({
      windSpeed: parameters.windSpeed,
      seismicZone: parameters.seismicZone,
      seismicFactor: parameters.seismicFactor,
      minTemp: parameters.minTemp,
      maxTemp: parameters.maxTemp,
    });
    onLocationLoad(parameters);
    setCustomModalOpen(false);
  };

  const currentState = locationData.states.find((s) => s.id === formData.state);
  const districts = currentState ? currentState.districts : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Project Location</h3>
        {backendAvailable !== null && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            backendAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {backendAvailable ? '✓ Backend Connected' : '⚠ Using Mock Data'}
          </span>
        )}
      </div>

      {apiError && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {apiError}
        </div>
      )}

      {loading && (
        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
          Loading...
        </div>
      )}

      <RadioGroup
        label="Mode"
        id="location-mode"
        value={formData.mode}
        onChange={handleModeChange}
        options={[
          { id: 'location', name: 'Enter Location Name' },
          { id: 'custom', name: 'Tabulate Custom Loading Parameters' },
        ]}
        disabled={disabled || loading}
      />

      {formData.mode === 'location' ? (
        <>
          <SelectField
            label="State"
            id="state-select"
            value={formData.state}
            onChange={handleStateChange}
            options={locationData.states}
            disabled={disabled || loading}
            required
          />

          {districts.length > 0 && (
            <SelectField
              label="District"
              id="district-select"
              value={formData.district}
              onChange={handleDistrictChange}
              options={districts}
              disabled={disabled || loading}
              required
            />
          )}
        </>
      ) : (
        <button
          onClick={() => setCustomModalOpen(true)}
          disabled={disabled || loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          Enter Custom Parameters
        </button>
      )}

      <LocationDisplay locationData={locationDisplayData} />

      <CustomLoadingModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        onSave={handleCustomSave}
      />
    </div>
  );
};

export default ProjectLocationSection;
