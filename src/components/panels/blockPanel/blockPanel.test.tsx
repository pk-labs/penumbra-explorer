import { act, getByText, render } from '@testing-library/react'
import BlockPanel from './blockPanel'

jest.mock('../numberPanel/numberPanel', () => (props: any) => (
    <div className={props.className}>
        <div>{props.number}</div>
        <div>{props.children}</div>
    </div>
))

describe('BlockPanel', () => {
    test('renders block height', async () => {
        const { container } = render(<BlockPanel blockHeight={1234567} />)
        getByText(container, 1234567)
    })

    describe('renders sync state', () => {
        describe('syncing', () => {
            test('when no block height', async () => {
                const { container } = render(<BlockPanel />)
                getByText(container, 'Syncing to blocks ...')
            })

            test('when initial block', async () => {
                const { container } = render(<BlockPanel blockHeight={99} />)
                getByText(container, 'Syncing to blocks ...')
            })
        })

        test('upcoming when block height', async () => {
            const { container, rerender } = render(
                <BlockPanel blockHeight={99} />
            )

            rerender(<BlockPanel blockHeight={100} />)

            getByText(container, 'Next block in ~5s')
        })

        test('late when no new block height after 6s', async () => {
            const { container, rerender } = render(
                <BlockPanel blockHeight={99} />
            )

            rerender(<BlockPanel blockHeight={100} />)

            act(() => jest.advanceTimersByTime(6000))
            getByText(container, 'Next block in ~0s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Next block late by ~1s')
        })

        test('not syncing after late timeout', async () => {
            const { container, rerender } = render(
                <BlockPanel blockHeight={99} />
            )

            rerender(<BlockPanel blockHeight={100} />)

            act(() => jest.advanceTimersByTime(6000))
            getByText(container, 'Next block in ~0s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Next block late by ~1s')

            act(() => jest.advanceTimersByTime(29000))
            getByText(container, 'Next block late by ~30s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Blocks not synced')
        })
    })

    test('cube does not rotate when no block', async () => {
        const { container } = render(<BlockPanel />)

        expect(container.querySelector('.cube')).not.toHaveClass(
            'rotateInfinite'
        )
    })

    describe('cube rotates', () => {
        test('when syncing', async () => {
            const { container } = render(<BlockPanel blockHeight={99} />)

            expect(container.querySelector('.cube')).toHaveClass(
                'rotateInfinite'
            )
        })

        test('when late', async () => {
            const { container, rerender } = render(
                <BlockPanel blockHeight={99} />
            )

            rerender(<BlockPanel blockHeight={100} />)

            act(() => jest.advanceTimersByTime(6000))
            getByText(container, 'Next block in ~0s')

            act(() => jest.advanceTimersByTime(1000))
            getByText(container, 'Next block late by ~1s')

            expect(container.querySelector('.cube')).toHaveClass(
                'rotateInfinite'
            )
        })
    })

    test('applies CSS classes', async () => {
        const { container } = render(<BlockPanel className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
