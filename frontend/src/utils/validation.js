/**
 * Validation utilities for bridge design inputs
 */

/**
 * Validate span length
 * Valid range: 20 to 45 meters
 */
export const validateSpan = (span) => {
  if (!span || isNaN(span)) {
    return { isValid: false, message: 'Span is required' };
  }
  const numSpan = parseFloat(span);
  if (numSpan < 20 || numSpan > 45) {
    return {
      isValid: false,
      message: 'Outside the software range. (Valid range: 20-45 m)',
    };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate carriageway width
 * Valid range: 4.25 to 24 meters
 */
export const validateCarriageWayWidth = (width) => {
  if (!width || isNaN(width)) {
    return { isValid: false, message: 'Carriageway Width is required' };
  }
  const numWidth = parseFloat(width);
  if (numWidth < 4.25 || numWidth >= 24) {
    return {
      isValid: false,
      message: 'Must be ≥4.25 and <24 m',
    };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate skew angle
 * Valid range: ±15 degrees
 */
export const validateSkewAngle = (angle) => {
  if (!angle || isNaN(angle)) {
    return { isValid: false, message: 'Skew Angle is required' };
  }
  const numAngle = parseFloat(angle);
  if (numAngle < -15 || numAngle > 15) {
    return {
      isValid: false,
      message: 'IRC 24 (2010) requires detailed analysis. (Valid range: ±15°)',
    };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate girder spacing geometry
 * Rules:
 * - Overall Width = Carriageway Width + 5
 * - Spacing & Overhang < Overall Width
 * - (Overall Width - Overhang) / Spacing = No. of Girders
 */
export const validateGeometry = (carriageWayWidth, spacing, overhang, numGirders) => {
  const errors = [];

  if (!carriageWayWidth || isNaN(carriageWayWidth)) {
    errors.push('Carriageway Width is required');
    return { isValid: false, errors };
  }

  const overallWidth = parseFloat(carriageWayWidth) + 5;

  // Validate spacing
  if (!spacing || isNaN(spacing)) {
    errors.push('Girder Spacing is required');
  } else {
    const numSpacing = parseFloat(spacing);
    if (numSpacing >= overallWidth) {
      errors.push(
        `Girder Spacing (${numSpacing}) must be < Overall Width (${overallWidth.toFixed(2)})`
      );
    }
  }

  // Validate overhang
  if (!overhang || isNaN(overhang)) {
    errors.push('Deck Overhang Width is required');
  } else {
    const numOverhang = parseFloat(overhang);
    if (numOverhang >= overallWidth) {
      errors.push(
        `Deck Overhang (${numOverhang}) must be < Overall Width (${overallWidth.toFixed(2)})`
      );
    }
  }

  // Validate no. of girders formula: (Overall Width - Overhang) / Spacing = No. of Girders
  if (spacing && overhang && numGirders && !isNaN(spacing) && !isNaN(overhang) && !isNaN(numGirders)) {
    const numSpacing = parseFloat(spacing);
    const numOverhang = parseFloat(overhang);
    const numGirdersNum = parseInt(numGirders, 10);
    const calculatedGirders = (overallWidth - numOverhang) / numSpacing;

    if (Math.abs(calculatedGirders - numGirdersNum) > 0.01) {
      errors.push(
        `Geometry mismatch: (Overall Width - Overhang) / Spacing should equal No. of Girders. ` +
        `Expected: ${calculatedGirders.toFixed(2)}, Got: ${numGirdersNum}`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    overallWidth: overallWidth.toFixed(2),
  };
};

/**
 * Auto-calculate missing geometry field
 * Returns updated values
 */
export const autoCalculateGeometry = (
  carriageWayWidth,
  spacing,
  overhang,
  numGirders,
  changedField
) => {
  const overallWidth = parseFloat(carriageWayWidth) + 5;
  const result = {
    spacing: spacing !== undefined ? parseFloat(spacing) : undefined,
    overhang: overhang !== undefined ? parseFloat(overhang) : undefined,
    numGirders: numGirders !== undefined ? parseInt(numGirders, 10) : undefined,
  };

  if (changedField === 'spacing' || changedField === 'numGirders') {
    // Calculate overhang or update girders
    if (result.spacing !== undefined && result.numGirders !== undefined) {
      result.overhang = overallWidth - result.spacing * result.numGirders;
    }
  }

  if (changedField === 'overhang' || changedField === 'numGirders') {
    // Calculate spacing or update girders
    if (result.overhang !== undefined && result.numGirders !== undefined) {
      result.spacing = (overallWidth - result.overhang) / result.numGirders;
    }
  }

  if (changedField === 'spacing' || changedField === 'overhang') {
    // Calculate number of girders
    if (result.spacing !== undefined && result.overhang !== undefined) {
      result.numGirders = Math.round(
        (overallWidth - result.overhang) / result.spacing
      );
    }
  }

  return result;
};
