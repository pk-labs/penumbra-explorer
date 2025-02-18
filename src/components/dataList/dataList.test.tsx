import { getByText, render } from '@testing-library/react';
import DataList from './dataList';
import DataListItem from './dataListItem';

describe('DataList', () => {
  test('renders children', async () => {
    const { container } = render(
      <DataList>
        <DataListItem name='Foo'>Bar</DataListItem>
      </DataList>,
    );

    getByText(container, 'Foo');
    getByText(container, 'Bar');
  });

  test('applies custom classes', async () => {
    const { container } = render(
      <DataList className='foo'>
        <DataListItem name='Foo'>Bar</DataListItem>
      </DataList>,
    );

    expect(container.firstElementChild?.classList.contains('foo')).toBe(true);
  });
});
