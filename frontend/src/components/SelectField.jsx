/**
 * SelectField Component
 * Reusable dropdown field with error handling
 */

import React from 'react';

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
  helperText,
}) => {
  const hasError = !!error;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : hasError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
        }`}
        aria-invalid={hasError}
        aria-describedby={hasError || helperText ? `${id}-description` : undefined}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.id || option} value={option.id || option}>
            {option.name || option}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p
          id={`${id}-description`}
          className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default SelectField;
