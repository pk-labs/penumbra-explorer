import { act, getByText, render } from '@testing-library/react'
import dayjs from '@/lib/dayjs'
import TimeAgo from './timeAgo'

describe('TimeAgo', () => {
    test('updates every second', async () => {
        const { container } = render(<TimeAgo timestamp={dayjs().valueOf()} />)

        getByText(container, '0s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '1s ago')

        act(() => jest.advanceTimersByTime(1000))
        getByText(container, '2s ago')
    })
})
