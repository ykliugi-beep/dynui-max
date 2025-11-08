import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DynTable } from './DynTable';

interface TestData {
  id: number;
  name: string;
  email: string;
}

describe('DynTable Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' }
    ];

    const rows: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    const { container } = render(
      <DynTable<TestData>
        columns={columns}
        rows={rows}
        caption="Test data table"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});