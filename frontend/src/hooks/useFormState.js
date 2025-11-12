/**
 * Custom hooks for managing form state and validations
 */

import { useState, useCallback } from 'react';
import {
  validateSpan,
  validateCarriageWayWidth,
  validateSkewAngle,
  validateGeometry,
  autoCalculateGeometry,
} from '../utils/validation';

/**
 * Hook to manage basic inputs form state
 */
export const useBasicInputsForm = () => {
  const [formData, setFormData] = useState({
    structureType: 'Highway',
    projectLocation: {
      mode: 'location', // 'location' or 'custom'
      state: '',
      district: '',
      windSpeed: '',
      seismicZone: '',
      seismicFactor: '',
      minTemp: '',
      maxTemp: '',
    },
    geometricDetails: {
      span: '',
      carriageWayWidth: '',
      footpath: 'None',
      skewAngle: '',
    },
    materials: {
      girderSteel: 'E250',
      crossBracingSteel: 'E250',
      deckConcrete: 'M25',
    },
  });

  const [errors, setErrors] = useState({});
  const [locationData, setLocationData] = useState(null);

  const updateFormData = useCallback((updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateProjectLocation = useCallback((locationUpdates) => {
    setFormData((prev) => ({
      ...prev,
      projectLocation: {
        ...prev.projectLocation,
        ...locationUpdates,
      },
    }));
  }, []);

  const updateGeometricDetails = useCallback((geometricUpdates) => {
    setFormData((prev) => ({
      ...prev,
      geometricDetails: {
        ...prev.geometricDetails,
        ...geometricUpdates,
      },
    }));
  }, []);

  const updateMaterials = useCallback((materialUpdates) => {
    setFormData((prev) => ({
      ...prev,
      materials: {
        ...prev.materials,
        ...materialUpdates,
      },
    }));
  }, []);

  const validateGeometricDetails = useCallback(() => {
    const newErrors = {};
    const { span, carriageWayWidth, skewAngle } = formData.geometricDetails;

    // Validate span
    const spanValidation = validateSpan(span);
    if (!spanValidation.isValid) {
      newErrors.span = spanValidation.message;
    }

    // Validate carriageway width
    const widthValidation = validateCarriageWayWidth(carriageWayWidth);
    if (!widthValidation.isValid) {
      newErrors.carriageWayWidth = widthValidation.message;
    }

    // Validate skew angle
    if (skewAngle !== '') {
      const skewValidation = validateSkewAngle(skewAngle);
      if (!skewValidation.isValid) {
        newErrors.skewAngle = skewValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.geometricDetails]);

  const setLocationDataForDistrict = useCallback((district) => {
    setLocationData(district);
  }, []);

  const clearLocationData = useCallback(() => {
    setLocationData(null);
  }, []);

  const setCustomLocationParameters = useCallback((parameters) => {
    updateProjectLocation({
      windSpeed: parameters.windSpeed,
      seismicZone: parameters.seismicZone,
      seismicFactor: parameters.seismicFactor,
      minTemp: parameters.minTemp,
      maxTemp: parameters.maxTemp,
    });
    setLocationData(parameters);
  }, [updateProjectLocation]);

  return {
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
    setCustomLocationParameters,
  };
};

/**
 * Hook to manage additional geometry modal state
 */
export const useGeometryModal = (initialCarriageWayWidth) => {
  const [isOpen, setIsOpen] = useState(false);
  const [geometryData, setGeometryData] = useState({
    spacing: '',
    numGirders: '',
    overhang: '',
  });
  const [errors, setErrors] = useState([]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const updateField = useCallback((field, value) => {
    const numValue = field === 'numGirders' ? parseInt(value, 10) : parseFloat(value);
    
    if (isNaN(numValue) && value !== '') return;

    const updated = { ...geometryData, [field]: value === '' ? '' : numValue };
    
    // Auto-calculate if other fields exist
    if (initialCarriageWayWidth) {
      const calculated = autoCalculateGeometry(
        initialCarriageWayWidth,
        updated.spacing,
        updated.overhang,
        updated.numGirders,
        field
      );
      
      setGeometryData({
        spacing: calculated.spacing !== undefined ? calculated.spacing.toFixed(1) : '',
        overhang: calculated.overhang !== undefined ? calculated.overhang.toFixed(1) : '',
        numGirders: calculated.numGirders !== undefined ? calculated.numGirders : '',
      });
    } else {
      setGeometryData(updated);
    }

    // Validate
    const validation = validateGeometry(
      initialCarriageWayWidth,
      updated.spacing,
      updated.overhang,
      updated.numGirders
    );
    setErrors(validation.errors);
  }, [geometryData, initialCarriageWayWidth]);

  const save = useCallback(() => {
    const validation = validateGeometry(
      initialCarriageWayWidth,
      geometryData.spacing,
      geometryData.overhang,
      geometryData.numGirders
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return null;
    }

    return geometryData;
  }, [geometryData, initialCarriageWayWidth]);

  return {
    isOpen,
    geometryData,
    errors,
    open,
    close,
    updateField,
    save,
  };
};
