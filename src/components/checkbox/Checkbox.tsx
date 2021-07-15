import React from "react";
import './checkbox.scss';

import { v4 } from 'uuid';

interface CheckboxProps {
  label: string,
  checked?: boolean, 
  value?: string
  onClick?: (value: string) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({label, checked, onClick, value}) => {
  const id = v4();

  const mock = (value: string) => {
    if (!onClick) return;

    onClick(value);
  }
  return (
    <div className="checkbox-container">
      <input id={id} className="hidden-xs-up" type="checkbox" onChange={e => mock(e.target.value)} checked={checked} value={value}/>
      <label htmlFor={id} className="cbx"></label>
      <label htmlFor={id} className="label">{label}</label>
    </div>
  )
}