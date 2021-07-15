import React from "react";
import { SortTypesByPrice } from "../../types";
import './input.scss';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password',
  min?: number,
  onChange?: (value: string, type: SortTypesByPrice) => void,
  value: string,
  attr?: string
}

export const Input: React.FC<InputProps> = ({type = 'text', min, onChange, attr}) => {
  const mock = (value: string, type: SortTypesByPrice) => {
    if (!onChange) {
      return;
    }

    onChange(value, type);
  }
  return (
    <div className="input">
      <input data-type={attr} type={type} min={min} onChange={e => mock(e.target.value, e.target.dataset.type! as SortTypesByPrice)}/>
    </div>
  )
}