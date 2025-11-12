/**
 * RadioGroup Component
 * Reusable radio button group
 */

import React from 'react';

const RadioGroup = ({
  label,
  id,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id || option} className="flex items-center">
            <input
              type="radio"
              id={`${id}-${option.id || option}`}
              name={id}
              value={option.id || option}
              checked={value === (option.id || option)}
              onChange={onChange}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor={`${id}-${option.id || option}`}
              className="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              {option.name || option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
