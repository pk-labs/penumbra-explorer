import { getByAltText, getByText, render } from '@testing-library/react'
import IbcChannels from './ibcChannels'

describe('IbcChannels', () => {
    test('renders channel pairs', async () => {
        const { container } = render(
            <IbcChannels
                chainImage="bar.jpg"
                chainName="bar"
                pairs={[
                    { channelId: 'foo1', counterpartyChannelId: 'bar1' },
                    {
                        channelId: 'foo2',
                        counterpartyChannelId: 'bar2',
                    },
                ]}
            />
        )

        getByText(container, 'foo1')
        getByText(container, 'bar1')
        getByText(container, 'foo2')
        getByText(container, 'bar2')
    })

    test('renders chain image', async () => {
        const { container } = render(
            <IbcChannels
                chainImage="bar.jpg"
                chainName="bar"
                pairs={[{ channelId: 'foo', counterpartyChannelId: 'bar' }]}
            />
        )

        expect(getByAltText(container, 'bar')).toHaveAttribute('src', 'bar.jpg')
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <IbcChannels
                chainImage="bar.jpg"
                chainName="bar"
                className="foo bar"
                pairs={[{ channelId: 'foo', counterpartyChannelId: 'bar' }]}
            />
        )

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
