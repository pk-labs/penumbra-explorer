import { act, getByText, render } from '@testing-library/react'
import BlockPanel from './blockPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>{props.children}</div>
))

describe('BlockPanel', () => {
    describe('renders sync state', () => {
        test('syncing when no block height', async () => {
            const { container } = render(<BlockPanel />)
            getByText(container, 'Syncing to blocks ...')
        })

        test('upcoming when block height', async () => {
            const { container } = render(<BlockPanel blockHeight={123} />)
            getByText(container, 'Block in ~5s')
        })

        test('late when no new block height after 6s', async () => {
            const { container } = render(<BlockPanel blockHeight={123} />)

            act(() => jest.advanceTimersByTime(6000))
            getByText(container, 'Block in ~0s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Block late by ~1s')
        })

        test('not syncing after late timeout', async () => {
            const { container } = render(<BlockPanel blockHeight={123} />)

            act(() => jest.advanceTimersByTime(6000))
            getByText(container, 'Block in ~0s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Block late by ~1s')

            act(() => jest.advanceTimersByTime(29000))
            getByText(container, 'Block late by ~30s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Blocks not synced')
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<BlockPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
