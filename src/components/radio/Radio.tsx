import React from 'react';
import { SortTypes } from '../../types';
import './radio.scss';

interface RadioProps {
  label: string,
  onChange?: (value: SortTypes) => void 
  attr?: string,
  checked: boolean
}

export const Radio: React.FC<RadioProps> = ({label, onChange, attr, checked}) => {
  return (
    <label>
      <input data-type={attr} onChange={e => onChange!(e.target.dataset.type! as SortTypes)} type="radio" name="radio" checked={checked}/>
      <span>{label}</span>
    </label>
  )
}