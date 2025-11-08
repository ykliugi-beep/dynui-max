import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from '../../test/setup';
import { DynTable } from './DynTable';


const COLUMNS = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' }
];

const DATA = [
  { key: '1', name: 'Alice', age: 30 }
];

describe('DynTable Accessibility', () => {
  it('has no violations with data rows', async () => {
    const { container } = render(
      <DynTable columns={COLUMNS} dataSource={DATA} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with selection and sorting', async () => {
    const { container } = render(
      <DynTable
        columns={[{ ...COLUMNS[0], sortable: true }, COLUMNS[1]]}
        dataSource={DATA}
        rowSelection={{ type: 'checkbox', onChange: vi.fn(), selectedRowKeys: [] }}
        sortConfig={{ sortBy: 'name', sortOrder: 'asc', onChange: vi.fn() }}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
