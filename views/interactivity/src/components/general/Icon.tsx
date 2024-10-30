import React from 'react';
import IconsSvg from './icons.svg';
import './Icon.css';

export function Icon({
  iconType,
}: {
  iconType: 'last-access-at' | 'total-access' | 'audio';
}) {
  return (
    <svg className="icon">
      <use href={`${IconsSvg}#icon-${iconType}`} />
    </svg>
  );
}
