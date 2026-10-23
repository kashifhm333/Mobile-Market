import React from 'react';

const ConditionBadge = ({ condition }) => {
  switch (condition) {
    case 'NEW':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-container text-on-primary">
          <span className="material-symbols-outlined text-[14px]">verified</span> Brand New
        </span>
      );
    case 'LIKE_NEW':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container">
          <span className="material-symbols-outlined text-[14px]">star</span> Pristine (Like New)
        </span>
      );
    case 'GOOD':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-high text-on-surface">
          <span className="material-symbols-outlined text-[14px]">check_circle</span> Good Tier
        </span>
      );
    case 'FAIR':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-tertiary-fixed text-on-tertiary-fixed">
          <span className="material-symbols-outlined text-[14px]">savings</span> Fair / Value Tier
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface">
          {condition}
        </span>
      );
  }
};

export default ConditionBadge;
