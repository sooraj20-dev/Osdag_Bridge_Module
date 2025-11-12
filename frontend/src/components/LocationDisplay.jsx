/**
 * LocationDisplay Component
 * Displays loaded location environmental parameters in a green badge
 */

import React from 'react';

const LocationDisplay = ({ locationData }) => {
  if (!locationData) return null;

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 className="text-sm font-semibold text-green-800 mb-3">
        Environmental Parameters
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-2 rounded border border-green-100">
          <p className="text-xs text-gray-600">Basic Wind Speed</p>
          <p className="text-sm font-semibold text-green-800">
            {locationData.basicWindSpeed} m/s
          </p>
        </div>
        <div className="bg-white p-2 rounded border border-green-100">
          <p className="text-xs text-gray-600">Seismic Zone</p>
          <p className="text-sm font-semibold text-green-800">
            {locationData.seismicZone}
          </p>
        </div>
        <div className="bg-white p-2 rounded border border-green-100">
          <p className="text-xs text-gray-600">Seismic Factor</p>
          <p className="text-sm font-semibold text-green-800">
            {locationData.seismicFactor}
          </p>
        </div>
        <div className="bg-white p-2 rounded border border-green-100">
          <p className="text-xs text-gray-600">Temperature Range</p>
          <p className="text-sm font-semibold text-green-800">
            {locationData.minTemp}°C to {locationData.maxTemp}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;
