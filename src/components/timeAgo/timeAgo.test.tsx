import { act, getByText, render } from '@testing-library/react'
import dayjs from '@/lib/dayjs'
import TimeAgo from './timeAgo'

describe('TimeAgo', () => {
    test('renders initial time ago', async () => {
        const { container } = render(
            <TimeAgo initialTimeAgo="1s ago" timestamp={0} />
        )

        getByText(container, '1s ago')
    })

    test('does not update when flag not set', async () => {
        const timestamp = dayjs().subtract(1, 'second').valueOf()

        const { container } = render(
            <TimeAgo initialTimeAgo="1s ago" timestamp={timestamp} />
        )

        getByText(container, '1s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '1s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '1s ago')
    })

    test('updates every second when flag set', async () => {
        const timestamp = dayjs().subtract(1, 'second').valueOf()

        const { container } = render(
            <TimeAgo initialTimeAgo="1s ago" timestamp={timestamp} update />
        )

        getByText(container, '1s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '2s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '3s ago')
    })
})
