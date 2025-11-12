/**
 * Mock API data for OSDAG Bridge Screening
 * Comprehensive dataset for major Indian states and key districts
 * Includes Wind Speed (m/s), Seismic Zone, Zone Factor, and Temperature (°C)
 */

export const locationData = {
  states: [
    // --- North India ---
    {
      id: 'delhi',
      name: 'Delhi',
      districts: [
        {
          id: 'new-delhi',
          name: 'New Delhi',
          basicWindSpeed: 47,
          seismicZone: 'Zone IV',
          seismicFactor: 0.24,
          minTemp: 5,
          maxTemp: 45,
        },
      ],
    },
    {
      id: 'uttar-pradesh',
      name: 'Uttar Pradesh',
      districts: [
        {
          id: 'lucknow',
          name: 'Lucknow',
          basicWindSpeed: 47,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 7,
          maxTemp: 43,
        },
        {
          id: 'kanpur',
          name: 'Kanpur',
          basicWindSpeed: 47,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 6,
          maxTemp: 44,
        },
      ],
    },
    {
      id: 'punjab',
      name: 'Punjab',
      districts: [
        {
          id: 'amritsar',
          name: 'Amritsar',
          basicWindSpeed: 47,
          seismicZone: 'Zone IV',
          seismicFactor: 0.24,
          minTemp: 2,
          maxTemp: 44,
        },
      ],
    },
    {
      id: 'haryana',
      name: 'Haryana',
      districts: [
        {
          id: 'gurugram',
          name: 'Gurugram',
          basicWindSpeed: 47,
          seismicZone: 'Zone IV',
          seismicFactor: 0.24,
          minTemp: 5,
          maxTemp: 44,
        },
      ],
    },
    {
      id: 'himachal-pradesh',
      name: 'Himachal Pradesh',
      districts: [
        {
          id: 'shimla',
          name: 'Shimla',
          basicWindSpeed: 39,
          seismicZone: 'Zone IV',
          seismicFactor: 0.24,
          minTemp: -2,
          maxTemp: 28,
        },
      ],
    },

    // --- West India ---
    {
      id: 'maharashtra',
      name: 'Maharashtra',
      districts: [
        {
          id: 'mumbai',
          name: 'Mumbai',
          basicWindSpeed: 39,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 22,
          maxTemp: 34,
        },
        {
          id: 'pune',
          name: 'Pune',
          basicWindSpeed: 39,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 15,
          maxTemp: 36,
        },
      ],
    },
    {
      id: 'gujarat',
      name: 'Gujarat',
      districts: [
        {
          id: 'ahmedabad',
          name: 'Ahmedabad',
          basicWindSpeed: 50,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 10,
          maxTemp: 43,
        },
      ],
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      districts: [
        {
          id: 'jaipur',
          name: 'Jaipur',
          basicWindSpeed: 47,
          seismicZone: 'Zone II',
          seismicFactor: 0.1,
          minTemp: 8,
          maxTemp: 46,
        },
      ],
    },
    {
      id: 'goa',
      name: 'Goa',
      districts: [
        {
          id: 'panaji',
          name: 'Panaji',
          basicWindSpeed: 44,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 21,
          maxTemp: 33,
        },
      ],
    },

    // --- South India ---
    {
      id: 'tamil-nadu',
      name: 'Tamil Nadu',
      districts: [
        {
          id: 'chennai',
          name: 'Chennai',
          basicWindSpeed: 50,
          seismicZone: 'Zone II',
          seismicFactor: 0.1,
          minTemp: 25,
          maxTemp: 38,
        },
      ],
    },
    {
      id: 'karnataka',
      name: 'Karnataka',
      districts: [
        {
          id: 'bangalore',
          name: 'Bangalore',
          basicWindSpeed: 39,
          seismicZone: 'Zone II',
          seismicFactor: 0.1,
          minTemp: 15,
          maxTemp: 30,
        },
      ],
    },
    {
      id: 'kerala',
      name: 'Kerala',
      districts: [
        {
          id: 'thiruvananthapuram',
          name: 'Thiruvananthapuram',
          basicWindSpeed: 44,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 23,
          maxTemp: 32,
        },
      ],
    },
    {
      id: 'andhra-pradesh',
      name: 'Andhra Pradesh',
      districts: [
        {
          id: 'visakhapatnam',
          name: 'Visakhapatnam',
          basicWindSpeed: 50,
          seismicZone: 'Zone II',
          seismicFactor: 0.1,
          minTemp: 22,
          maxTemp: 37,
        },
      ],
    },
    {
      id: 'telangana',
      name: 'Telangana',
      districts: [
        {
          id: 'hyderabad',
          name: 'Hyderabad',
          basicWindSpeed: 39,
          seismicZone: 'Zone II',
          seismicFactor: 0.1,
          minTemp: 17,
          maxTemp: 39,
        },
      ],
    },

    // --- East India ---
    {
      id: 'west-bengal',
      name: 'West Bengal',
      districts: [
        {
          id: 'kolkata',
          name: 'Kolkata',
          basicWindSpeed: 50,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 12,
          maxTemp: 38,
        },
      ],
    },
    {
      id: 'odisha',
      name: 'Odisha',
      districts: [
        {
          id: 'bhubaneswar',
          name: 'Bhubaneswar',
          basicWindSpeed: 50,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 14,
          maxTemp: 40,
        },
      ],
    },
    {
      id: 'bihar',
      name: 'Bihar',
      districts: [
        {
          id: 'patna',
          name: 'Patna',
          basicWindSpeed: 47,
          seismicZone: 'Zone IV',
          seismicFactor: 0.24,
          minTemp: 8,
          maxTemp: 42,
        },
      ],
    },
    {
      id: 'jharkhand',
      name: 'Jharkhand',
      districts: [
        {
          id: 'ranchi',
          name: 'Ranchi',
          basicWindSpeed: 47,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 9,
          maxTemp: 38,
        },
      ],
    },
    {
      id: 'assam',
      name: 'Assam',
      districts: [
        {
          id: 'guwahati',
          name: 'Guwahati',
          basicWindSpeed: 50,
          seismicZone: 'Zone V',
          seismicFactor: 0.36,
          minTemp: 12,
          maxTemp: 36,
        },
      ],
    },

    // --- Central India ---
    {
      id: 'madhya-pradesh',
      name: 'Madhya Pradesh',
      districts: [
        {
          id: 'bhopal',
          name: 'Bhopal',
          basicWindSpeed: 47,
          seismicZone: 'Zone III',
          seismicFactor: 0.16,
          minTemp: 9,
          maxTemp: 42,
        },
      ],
    },
    {
      id: 'chhattisgarh',
      name: 'Chhattisgarh',
      districts: [
        {
          id: 'raipur',
          name: 'Raipur',
          basicWindSpeed: 44,
          seismicZone: 'Zone II',
          seismicFactor: 0.1,
          minTemp: 13,
          maxTemp: 40,
        },
      ],
    },

    // --- North-East India ---
    {
      id: 'meghalaya',
      name: 'Meghalaya',
      districts: [
        {
          id: 'shillong',
          name: 'Shillong',
          basicWindSpeed: 39,
          seismicZone: 'Zone V',
          seismicFactor: 0.36,
          minTemp: 8,
          maxTemp: 28,
        },
      ],
    },
    {
      id: 'tripura',
      name: 'Tripura',
      districts: [
        {
          id: 'agartala',
          name: 'Agartala',
          basicWindSpeed: 44,
          seismicZone: 'Zone V',
          seismicFactor: 0.36,
          minTemp: 11,
          maxTemp: 35,
        },
      ],
    },
    {
      id: 'nagaland',
      name: 'Nagaland',
      districts: [
        {
          id: 'kohima',
          name: 'Kohima',
          basicWindSpeed: 39,
          seismicZone: 'Zone V',
          seismicFactor: 0.36,
          minTemp: 6,
          maxTemp: 30,
        },
      ],
    },
    {
      id: 'arunachal-pradesh',
      name: 'Arunachal Pradesh',
      districts: [
        {
          id: 'itanagar',
          name: 'Itanagar',
          basicWindSpeed: 50,
          seismicZone: 'Zone V',
          seismicFactor: 0.36,
          minTemp: 10,
          maxTemp: 34,
        },
      ],
    },
  ],
};

/**
 * Material options for bridge design
 */
export const materialOptions = {
  girderSteel: ['E250', 'E350', 'E450'],
  crossBracingSteel: ['E250', 'E350', 'E450'],
  deckConcrete: ['M25', 'M30', 'M35', 'M40', 'M45', 'M50', 'M55', 'M60'],
};

/**
 * Footpath options
 */
export const footpathOptions = ['Single-sided', 'Both', 'None'];

/**
 * Structure types
 */
export const structureTypes = ['Highway', 'Other'];

/**
 * Helper function to get all districts from location data
 */
export const getAllDistricts = () => {
  return locationData.states.flatMap((state) =>
    state.districts.map((district) => ({
      ...district,
      state: state.name,
      stateId: state.id,
    }))
  );
};

/**
 * Helper function to find district data by ID
 */
export const getDistrictData = (districtId) => {
  for (const state of locationData.states) {
    const district = state.districts.find((d) => d.id === districtId);
    if (district) {
      return { ...district, state: state.name, stateId: state.id };
    }
  }
  return null;
};
