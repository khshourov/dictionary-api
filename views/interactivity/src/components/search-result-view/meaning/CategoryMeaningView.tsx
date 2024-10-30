import React from 'react';
import { Accordion } from '../../general/Accordion';
import { Meaning } from '../../types';
import { MeaningView } from './MeaningView';

export function CategoryMeaningView({
  categoryMeanings,
}: {
  categoryMeanings: Meaning[];
}) {
  return (
    <Accordion id="meaning-header" label="Meanings">
      {categoryMeanings.map((categoryMeaning, id) => (
        <Accordion
          id={`category-header-${id}`}
          label={categoryMeaning.categories}
        >
          {categoryMeaning.entries.map((meaning) => (
            <MeaningView meaning={meaning} />
          ))}
        </Accordion>
      ))}
    </Accordion>
  );
}
