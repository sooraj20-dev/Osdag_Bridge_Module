/**
 * MaterialInputsSection Component
 * Handles selection of girder steel, cross-bracing steel, and deck concrete
 */

import React from 'react';
import SelectField from './SelectField';
import { materialOptions } from '../data/mockApi';

const MaterialInputsSection = ({
  materials,
  onUpdate,
  disabled = false,
}) => {
  const girderSteelOptions = materialOptions.girderSteel.map((steel) => ({
    id: steel,
    name: steel,
  }));

  const crossBracingSteelOptions = materialOptions.crossBracingSteel.map((steel) => ({
    id: steel,
    name: steel,
  }));

  const deckConcreteOptions = materialOptions.deckConcrete.map((concrete) => ({
    id: concrete,
    name: concrete,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Material Inputs</h3>

      <SelectField
        label="Girder Steel"
        id="girder-steel"
        value={materials.girderSteel}
        onChange={(e) => onUpdate({ girderSteel: e.target.value })}
        options={girderSteelOptions}
        disabled={disabled}
        required
      />

      <SelectField
        label="Cross Bracing Steel"
        id="cross-bracing-steel"
        value={materials.crossBracingSteel}
        onChange={(e) => onUpdate({ crossBracingSteel: e.target.value })}
        options={crossBracingSteelOptions}
        disabled={disabled}
        required
      />

      <SelectField
        label="Deck Concrete"
        id="deck-concrete"
        value={materials.deckConcrete}
        onChange={(e) => onUpdate({ deckConcrete: e.target.value })}
        options={deckConcreteOptions}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default MaterialInputsSection;
