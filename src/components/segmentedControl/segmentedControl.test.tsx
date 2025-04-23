import { render } from '@testing-library/react'
import SegmentedControl from './segmentedControl'

describe('SegmentedControl', () => {
    test('applies CSS classes', async () => {
        const { container } = render(
            <SegmentedControl
                className="foo bar"
                onChange={jest.fn()}
                value="foo"
            >
                <SegmentedControl.Item value="foo" />
            </SegmentedControl>
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
