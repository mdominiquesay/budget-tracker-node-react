// BudgetMasterForm.test.js

import React from 'react';
import { render } from '@testing-library/react';
import BudgetMasterForm from './BudgetMasterForm'; // Update the import path as necessary

// Test the BudgetMasterForm component
describe('BudgetMasterForm', () => {
  it('renders correctly', () => {
    // Mock props
    const props = {
      budget_name: 'Test Budget',
      handleChange: jest.fn(),
    };

    // Render the component
    const { container } = render(<BudgetMasterForm {...props} />);

    // Assert that the rendered component matches the snapshot
    expect(container).toMatchSnapshot();
  });
});
