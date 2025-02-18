import { getByText, render } from '@testing-library/react';
import Pill from './pill';

describe('Pill', () => {
  test('renders children', async () => {
    const { container } = render(<Pill>Foo</Pill>);
    getByText(container, 'Foo');
  });

  test('applies custom classes', async () => {
    const { container } = render(<Pill className='foo bar'>Foo</Pill>);

    const root = getByText(container, 'Foo');
    expect(root.classList.contains('foo')).toBe(true);
    expect(root.classList.contains('bar')).toBe(true);
  });
});
