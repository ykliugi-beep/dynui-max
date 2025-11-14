import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import { axe } from 'vitest-axe';
import { DynTable } from './DynTable';

const COLUMNS = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'age', title: 'Age', dataIndex: 'age' }
];

const [nameColumn, ageColumn] = COLUMNS;

if (!nameColumn || !ageColumn) {
  throw new Error('DynTable accessibility tests require both name and age columns.');
}

const DATA = [
  { key: '1', name: 'Alice', age: 30 }
];

describe('DynTable Accessibility', () => {
  it('has no violations with data rows', async () => {
    const { container } = render(
      <DynTable columns={[nameColumn, ageColumn]} dataSource={DATA} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations with selection and sorting', async () => {
    const { container } = render(
      <DynTable
        columns={[{ ...nameColumn, sortable: true }, ageColumn]}
        dataSource={DATA}
        rowSelection={{ type: 'checkbox', onChange: vi.fn(), selectedRowKeys: [] }}
        sortConfig={{ sortBy: 'name', sortOrder: 'asc', onChange: vi.fn() }}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
