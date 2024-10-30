import React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

test('accordion should have a label and content block', async () => {
  const id = 'accordion-id';
  const label = 'label';
  const Children = () => <div>Hello</div>;
  render(
    <Accordion id={id} label={label}>
      <Children />
    </Accordion>,
  );

  expect(screen.queryByText(label)).toBeInTheDocument();
  expect(screen.queryByText('Hello')).toBeInTheDocument();
});
