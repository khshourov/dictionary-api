import React, { ReactNode } from 'react';
import './Accordion.css';

export function Accordion({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="accordion">
      <input id={id} type="checkbox" name={label} />
      <h2 className="handle">
        <label htmlFor={id}>{label}</label>
      </h2>
      <div className="content">{children}</div>
    </section>
  );
}
