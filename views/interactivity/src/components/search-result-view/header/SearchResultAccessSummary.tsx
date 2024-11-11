import React from 'react';
import { Utils } from '../../../lib/utils';
import { Icon } from '../../general/Icon';
import { AccessSummary } from '../../types';
import './SearchResultAccessSummary.css';

export function SearchResultAccessSummary({
  accessSummary,
}: {
  accessSummary: AccessSummary;
}) {
  return (
    <div className="access-info-container" data-testid="access-summary">
      <div className="access-info">
        <Icon iconType="last-access-at" />
        <span className="access-content">
          {new Utils().iso8601ToDate(accessSummary.lastAccessAt)}
        </span>
        <Icon iconType="total-access" />
        <span className="access-content">{accessSummary.totalAccess}</span>
      </div>
    </div>
  );
}
