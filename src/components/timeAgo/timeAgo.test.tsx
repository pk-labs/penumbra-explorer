import { act, getByText, render } from '@testing-library/react'
import dayjs from '@/lib/dayjs'
import TimeAgo from './timeAgo'

describe('TimeAgo', () => {
    test('renders initial time ago', async () => {
        const { container } = render(
            <TimeAgo
                initialTimeAgo="1s ago"
                timestamp={dayjs().subtract(1, 'second').valueOf()}
            />
        )

        getByText(container, '1s ago')
    })

    test('updates every second', async () => {
        const { container } = render(
            <TimeAgo initialTimeAgo="0s ago" timestamp={dayjs().valueOf()} />
        )

        getByText(container, '0s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '1s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '2s ago')
    })
})
