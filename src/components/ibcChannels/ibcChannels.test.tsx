import { getByAltText, getByText, render } from '@testing-library/react'
import IbcChannels from './ibcChannels'

describe('IbcChannels', () => {
    test('renders channels', async () => {
        const { container } = render(
            <IbcChannels
                channelId="foo-123"
                counterpartyChannelId="bar-456"
                counterpartyImage="bar.jpg"
                counterpartyName="bar"
            />
        )

        getByText(container, 'foo-123')
        getByText(container, 'bar-456')
    })

    test('renders chain image', async () => {
        const { container } = render(
            <IbcChannels
                channelId="foo"
                counterpartyChannelId="bar"
                counterpartyImage="bar.jpg"
                counterpartyName="bar"
            />
        )

        expect(getByAltText(container, 'bar')).toHaveAttribute('src', 'bar.jpg')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <IbcChannels
                channelId="foo"
                className="foo bar"
                counterpartyChannelId="bar"
                counterpartyImage="bar.jpg"
                counterpartyName="bar"
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
