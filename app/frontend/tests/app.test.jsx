import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConditionBadge from '../src/components/common/ConditionBadge.jsx';
import SafetyBanner from '../src/components/common/SafetyBanner.jsx';

describe('MobileMart Frontend Component Tests', () => {
  describe('ConditionBadge', () => {
    it('renders Brand New badge correctly', () => {
      render(<ConditionBadge condition="NEW" />);
      expect(screen.getByText(/Brand New/i)).toBeInTheDocument();
    });

    it('renders Pristine (Like New) badge correctly', () => {
      render(<ConditionBadge condition="LIKE_NEW" />);
      expect(screen.getByText(/Pristine \(Like New\)/i)).toBeInTheDocument();
    });

    it('renders Good Tier badge correctly', () => {
      render(<ConditionBadge condition="GOOD" />);
      expect(screen.getByText(/Good Tier/i)).toBeInTheDocument();
    });

    it('renders Fair badge correctly', () => {
      render(<ConditionBadge condition="FAIR" />);
      expect(screen.getByText(/Fair \/ Value Tier/i)).toBeInTheDocument();
    });
  });

  describe('SafetyBanner', () => {
    it('renders Peer-to-Peer Marketplace disclaimer', () => {
      render(<SafetyBanner />);
      expect(screen.getByText(/Safe Peer-to-Peer Marketplace Notice/i)).toBeInTheDocument();
      expect(screen.getByText(/We do not hold funds, process credit cards, or provide escrow/i)).toBeInTheDocument();
    });

    it('renders compact mode with direct settlement notice', () => {
      render(<SafetyBanner compact />);
      expect(screen.getByText(/MobileMart does not collect payments/i)).toBeInTheDocument();
    });
  });
});
