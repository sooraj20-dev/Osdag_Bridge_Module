/**
 * CustomLoadingModal Component
 * Modal for entering custom loading parameters (wind, seismic, temperature)
 * Features:
 * - Spreadsheet-style table for data entry
 * - Support for multiple parameter sets
 * - Server-side save (optional, graceful fallback)
 */

import React, { useState } from 'react';
import InputField from './InputField';
import apiService from '../services/api';

const CustomLoadingModal = ({ isOpen, onClose, onSave }) => {
  const [rows, setRows] = useState([
    {
      id: 1,
      windSpeed: '',
      seismicZone: '',
      seismicFactor: '',
      minTemp: '',
      maxTemp: '',
    },
  ]);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const addRow = () => {
    const newRow = {
      id: Math.max(...rows.map((r) => r.id), 0) + 1,
      windSpeed: '',
      seismicZone: '',
      seismicFactor: '',
      minTemp: '',
      maxTemp: '',
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((r) => r.id !== id));
      // Clear errors for removed row
      const newErrors = { ...errors };
      delete newErrors[`windSpeed-${id}`];
      delete newErrors[`seismicZone-${id}`];
      delete newErrors[`seismicFactor-${id}`];
      delete newErrors[`minTemp-${id}`];
      delete newErrors[`maxTemp-${id}`];
      setErrors(newErrors);
    }
  };

  const updateCell = (id, field, value) => {
    setRows(
      rows.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      )
    );
    // Clear error for this cell
    const errorKey = `${field}-${id}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const validateRows = () => {
    const newErrors = {};

    rows.forEach((row) => {
      // Skip empty rows
      if (
        !row.windSpeed &&
        !row.seismicZone &&
        !row.seismicFactor &&
        !row.minTemp &&
        !row.maxTemp
      ) {
        return;
      }

      // Validate wind speed
      if (!row.windSpeed || isNaN(parseFloat(row.windSpeed))) {
        newErrors[`windSpeed-${row.id}`] = 'Required, numeric';
      }

      // Validate seismic zone
      if (!row.seismicZone?.trim()) {
        newErrors[`seismicZone-${row.id}`] = 'Required';
      }

      // Validate seismic factor
      if (!row.seismicFactor || isNaN(parseFloat(row.seismicFactor))) {
        newErrors[`seismicFactor-${row.id}`] = 'Required, numeric';
      }

      // Validate min temperature
      if (!row.minTemp || isNaN(parseFloat(row.minTemp))) {
        newErrors[`minTemp-${row.id}`] = 'Required, numeric';
      }

      // Validate max temperature
      if (!row.maxTemp || isNaN(parseFloat(row.maxTemp))) {
        newErrors[`maxTemp-${row.id}`] = 'Required, numeric';
      }

      // Check min < max
      if (
        row.minTemp &&
        row.maxTemp &&
        parseFloat(row.minTemp) >= parseFloat(row.maxTemp)
      ) {
        newErrors[`maxTemp-${row.id}`] = 'Max must be > Min';
      }
    });

    // Check if at least one row has data
    if (rows.every((r) => !r.windSpeed && !r.seismicZone)) {
      newErrors.empty = 'Please enter at least one parameter set';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateRows()) return;

    setSaving(true);
    try {
      // Use the first valid row as primary parameters
      const validRow = rows.find(
        (r) => r.windSpeed && r.seismicZone
      );

      if (validRow) {
        const parameters = {
          windSpeed: parseFloat(validRow.windSpeed),
          seismicZone: validRow.seismicZone,
          seismicFactor: parseFloat(validRow.seismicFactor),
          minTemp: parseFloat(validRow.minTemp),
          maxTemp: parseFloat(validRow.maxTemp),
        };

        // Try to save all rows to backend (optional)
        if (rows.length > 1 || rows[0].windSpeed) {
          try {
            await apiService.saveCustomParameters({
              parameters: rows.map((r) => ({
                wind_speed: r.windSpeed ? parseFloat(r.windSpeed) : null,
                seismic_zone: r.seismicZone || null,
                seismic_factor: r.seismicFactor
                  ? parseFloat(r.seismicFactor)
                  : null,
                min_temp: r.minTemp ? parseFloat(r.minTemp) : null,
                max_temp: r.maxTemp ? parseFloat(r.maxTemp) : null,
              })),
            });
          } catch (error) {
            // Silently continue - backend save is optional
          }
        }

        onSave(parameters);
        handleClose();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setRows([
      {
        id: 1,
        windSpeed: '',
        seismicZone: '',
        seismicFactor: '',
        minTemp: '',
        maxTemp: '',
      },
    ]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Custom Loading Parameters
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter bridge loading parameters in the table below. At least one complete row is required.
          </p>
        </div>

        <div className="p-6">
          {errors.empty && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {errors.empty}
            </div>
          )}

          {/* Spreadsheet Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-12">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-36">
                    Wind Speed (m/s)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-32">
                    Seismic Zone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-36">
                    Zone Factor
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-36">
                    Min Temp (°C)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-36">
                    Max Temp (°C)
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-600">
                      {index + 1}
                    </td>

                    {/* Wind Speed */}
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={row.windSpeed}
                        onChange={(e) =>
                          updateCell(row.id, 'windSpeed', e.target.value)
                        }
                        placeholder="e.g., 39"
                        className={`w-full px-2 py-1 border rounded text-sm font-medium ${
                          errors[`windSpeed-${row.id}`]
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors[`windSpeed-${row.id}`] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors[`windSpeed-${row.id}`]}
                        </p>
                      )}
                    </td>

                    {/* Seismic Zone */}
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={row.seismicZone}
                        onChange={(e) =>
                          updateCell(row.id, 'seismicZone', e.target.value)
                        }
                        placeholder="e.g., Zone II"
                        className={`w-full px-2 py-1 border rounded text-sm font-medium ${
                          errors[`seismicZone-${row.id}`]
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors[`seismicZone-${row.id}`] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors[`seismicZone-${row.id}`]}
                        </p>
                      )}
                    </td>

                    {/* Seismic Factor */}
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={row.seismicFactor}
                        onChange={(e) =>
                          updateCell(row.id, 'seismicFactor', e.target.value)
                        }
                        placeholder="e.g., 0.10"
                        className={`w-full px-2 py-1 border rounded text-sm font-medium ${
                          errors[`seismicFactor-${row.id}`]
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors[`seismicFactor-${row.id}`] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors[`seismicFactor-${row.id}`]}
                        </p>
                      )}
                    </td>

                    {/* Min Temp */}
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.1"
                        value={row.minTemp}
                        onChange={(e) =>
                          updateCell(row.id, 'minTemp', e.target.value)
                        }
                        placeholder="e.g., 5"
                        className={`w-full px-2 py-1 border rounded text-sm font-medium ${
                          errors[`minTemp-${row.id}`]
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors[`minTemp-${row.id}`] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors[`minTemp-${row.id}`]}
                        </p>
                      )}
                    </td>

                    {/* Max Temp */}
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.1"
                        value={row.maxTemp}
                        onChange={(e) =>
                          updateCell(row.id, 'maxTemp', e.target.value)
                        }
                        placeholder="e.g., 35"
                        className={`w-full px-2 py-1 border rounded text-sm font-medium ${
                          errors[`maxTemp-${row.id}`]
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors[`maxTemp-${row.id}`] && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors[`maxTemp-${row.id}`]}
                        </p>
                      )}
                    </td>

                    {/* Remove Button */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 font-medium text-sm"
                        title="Remove row"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <button
            onClick={addRow}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium text-sm transition"
          >
            + Add Row
          </button>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomLoadingModal;
