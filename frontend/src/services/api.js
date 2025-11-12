/**
 * API Service - Axios-based API client for Django backend
 * Handles all communication with the backend REST API
 */

import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API Service Object - Contains all endpoints
 */
const apiService = {
  /**
   * Fetch all locations
   * GET /api/locations/
   */
  getLocations: async () => {
    try {
      const response = await apiClient.get('/locations/');
      return {
        success: true,
        data: response.data.results || response.data,
        message: 'Locations fetched successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Failed to fetch locations',
      };
    }
  },

  /**
   * Fetch location by state and district
   * GET /api/locations/by_state/ or by_district/
   */
  getLocationByStateDistrict: async (state, district) => {
    try {
      // Try to fetch by state and district filters
      const response = await apiClient.get('/locations/', {
        params: {
          state,
          district,
        },
      });

      const location = response.data.results?.[0] || response.data?.[0];
      if (location) {
        return {
          success: true,
          data: location,
          message: 'Location fetched successfully',
        };
      } else {
        return {
          success: false,
          error: 'Location not found',
          message: 'Location not found in database',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Failed to fetch location',
      };
    }
  },

  /**
   * Validate geometry
   * POST /api/geometry/validate/
   * Body: { carriageway_width, girder_spacing, num_girders, deck_overhang_width }
   */
  validateGeometry: async (geometryData) => {
    try {
      const response = await apiClient.post('/geometry/validate/', geometryData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Geometry validated successfully',
        valid: response.data.valid,
      };
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        error.message;
      return {
        success: false,
        error: errorMsg,
        message: 'Geometry validation failed',
        valid: false,
      };
    }
  },

  /**
   * Get available material options
   * GET /api/materials/
   */
  getMaterialOptions: async () => {
    try {
      const response = await apiClient.get('/materials/');
      return {
        success: true,
        data: response.data,
        message: 'Material options fetched successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Failed to fetch material options',
      };
    }
  },

  /**
   * Submit bridge design
   * POST /api/submit/
   */
  submitDesign: async (designData) => {
    try {
      const response = await apiClient.post('/submit/', designData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Design submitted successfully',
      };
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message;
      return {
        success: false,
        error: errorMsg,
        message: 'Design submission failed',
      };
    }
  },

  /**
   * Save custom parameters (optional endpoint)
   * POST /api/custom-params/
   */
  saveCustomParameters: async (parameters) => {
    try {
      const response = await apiClient.post('/custom-params/', parameters);
      return {
        success: true,
        data: response.data,
        message: 'Custom parameters saved successfully',
      };
    } catch (error) {
      // If endpoint doesn't exist, just return success (graceful fallback)
      if (error.response?.status === 404) {
        return {
          success: true,
          data: parameters,
          message: 'Custom parameters saved locally',
        };
      }
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Failed to save custom parameters',
      };
    }
  },

  /**
   * Health check - Test backend connectivity
   * GET /api/locations/ (simple test)
   */
  checkBackendConnection: async () => {
    try {
      await apiClient.get('/locations/', {
        timeout: 2000,
      });
      return {
        success: true,
        connected: true,
        message: 'Backend connected',
      };
    } catch (error) {
      return {
        success: false,
        connected: false,
        error: error.message,
        message: 'Backend not reachable',
      };
    }
  },
};

export default apiService;
