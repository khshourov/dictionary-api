import React from 'react';
import { Utils } from '../../../lib/utils';
import { Icons } from '../../icons.svg';
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
        <Icons />
        <div className="icon">
          <svg>
            <use id="#icon-last-access-at" />
          </svg>
        </div>
        <span className="access-content">
          {new Utils().iso8601ToDateTime(accessSummary.lastAccessAt)}
        </span>
        <div className="icon">
          <svg>
            <use id="#icon-total-access" />
          </svg>
        </div>
        <span className="access-content">{accessSummary.totalAccess}</span>
      </div>
    </div>
  );
}
