import formatNumber from './formatNumber';

describe('formatNumber', () => {
  test('formats number as expected', async () => {
    expect(formatNumber('1234567.89')).toBe('1,234,567.89');
  });
});
