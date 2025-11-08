import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DynTable, TableColumn } from './DynTable';

interface TestData {
  id: number;
  name: string;
  email: string;
}

describe('DynTable Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const columns: TableColumn<TestData>[] = [
      { key: 'id', title: 'ID', sortable: true },
      { key: 'name', title: 'Name', sortable: true },
      { key: 'email', title: 'Email' }
    ];

    const dataSource: TestData[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    const { container } = render(
      <DynTable
        columns={columns}
        dataSource={dataSource}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});