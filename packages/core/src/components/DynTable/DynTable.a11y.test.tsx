import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynTable } from './DynTable';
import type { TableColumn } from './DynTable';

expect.extend(toHaveNoViolations);

interface TestData {
  id: number;
  name: string;
  email: string;
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const mockColumns: TableColumn<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'actions', title: 'Actions', sortable: true }
];

describe('DynTable - Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynTable
        columns={mockColumns}
        data={mockData}
        caption="User data table"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
