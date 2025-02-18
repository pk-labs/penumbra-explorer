import { getByText, render } from '@testing-library/react';
import View from './view';

describe('View', () => {
  test('renders children, title and subtitle', async () => {
    const { container } = render(
      <View title='Bar' subtitle='Baz'>
        Foo
      </View>,
    );

    getByText(container, 'Foo');
    getByText(container, 'Bar');
    getByText(container, 'Baz');
  });

  test('applies custom classes', async () => {
    const { container } = render(
      <View title='Bar' subtitle='Baz' className='foo'>
        Foo
      </View>,
    );

    expect(getByText(container, 'Foo').classList.contains('foo')).toBe(true);
  });
});
