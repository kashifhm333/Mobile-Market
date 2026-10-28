import React from 'react';
import { Sparkles, Star, CheckCircle2, Tag } from 'lucide-react';

const ConditionBadge = ({ condition }) => {
  switch (condition) {
    case 'NEW':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container border border-secondary/30">
          <Sparkles className="w-3 h-3 text-secondary shrink-0" /> Brand New
        </span>
      );
    case 'LIKE_NEW':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-high text-on-surface border border-outline-variant">
          <Star className="w-3 h-3 text-secondary shrink-0" /> Pristine (Like New)
        </span>
      );
    case 'GOOD':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container text-on-surface border border-surface-container-high">
          <CheckCircle2 className="w-3 h-3 text-outline shrink-0" /> Good Tier
        </span>
      );
    case 'FAIR':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-low text-on-surface-variant border border-outline-variant">
          <Tag className="w-3 h-3 text-outline shrink-0" /> Fair / Value Tier
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface border border-surface-container">
          {condition}
        </span>
      );
  }
};

export default ConditionBadge;
