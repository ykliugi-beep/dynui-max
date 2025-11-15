import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DynTable } from './DynTable';

const COLUMNS = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' }
];

const [nameColumn, ageColumn] = COLUMNS;

if (!nameColumn || !ageColumn) {
  throw new Error('DynTable tests require both name and age columns.');
}

const DATA = [
  { key: '1', name: 'Alice', age: 30 },
  { key: '2', name: 'Bob', age: 25 }
];

describe('DynTable', () => {
  it('renders data rows and handles row selection', async () => {
    const user = userEvent.setup();
    const handleSelection = vi.fn();

    render(
      <DynTable
        columns={[nameColumn, ageColumn]}
        dataSource={DATA}
        rowSelection={{ onChange: handleSelection, selectedRowKeys: [] }}
      />
    );

    const firstRow = screen.getByRole('checkbox', { name: 'Select row 1' });
    await user.click(firstRow);

    expect(handleSelection).toHaveBeenCalledWith(['1'], [DATA[0]]);
  });

  it('supports sorting via column headers', async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();

    render(
      <DynTable
        columns={[nameColumn, ageColumn]}
        dataSource={DATA}
        sortConfig={{ sortBy: 'name', sortOrder: 'asc', onChange: handleSort }}
      />
    );

    const nameHeader = screen.getByRole('columnheader', { name: /Name/ });
    await user.click(nameHeader);

    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('renders loading and empty states', () => {
    const { rerender } = render(
      <DynTable columns={[nameColumn, ageColumn]} dataSource={[]} loading />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    rerender(
      <DynTable columns={[nameColumn, ageColumn]} dataSource={[]} loading={false} emptyText="No records" />
    );

    expect(screen.getByText('No records')).toBeInTheDocument();
  });
});
