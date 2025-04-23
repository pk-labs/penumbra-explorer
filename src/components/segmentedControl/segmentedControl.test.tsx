import { render } from '@testing-library/react'
import SegmentedControl from './segmentedControl'

describe('SegmentedControl', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <SegmentedControl className="foo bar">Foo</SegmentedControl>
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
