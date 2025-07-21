import { act, getByText, render, waitFor } from '@testing-library/react'
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
            getByText(container, 'Upcoming block in ...')
        })

        test('late when no new block height after 6s', async () => {
            const { container } = render(<BlockPanel blockHeight={123} />)

            act(() => jest.advanceTimersByTime(6000))

            await waitFor(() => {
                getByText(container, 'Upcoming block late by ...')
            })
        })

        test('not syncing after late timeout', async () => {
            const { container } = render(<BlockPanel blockHeight={123} />)

            act(() => jest.advanceTimersByTime(6000))

            await waitFor(() => {
                getByText(container, 'Upcoming block late by ...')
            })

            act(() => jest.advanceTimersByTime(3000))

            await waitFor(() => {
                getByText(container, 'Blocks not synced')
            })
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<BlockPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
