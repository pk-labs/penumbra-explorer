import { getByText, render } from '@testing-library/react'
import dayjs from '@/lib/dayjs'
import TimeAgo from './timeAgo'

describe('TimeAgo', () => {
    test('renders seconds ago', async () => {
        const date = dayjs().subtract(3, 'seconds').toISOString()
        const { container } = render(<TimeAgo isoDate={date} />)

        getByText(container, '3s ago')
    })

    test('renders minutes ago', async () => {
        const date = dayjs().subtract(3, 'minutes').toISOString()
        const { container } = render(<TimeAgo isoDate={date} />)

        getByText(container, '3min ago')
    })

    test('renders hours ago', async () => {
        const date = dayjs().subtract(3, 'hours').toISOString()
        const { container } = render(<TimeAgo isoDate={date} />)

        getByText(container, '3hr ago')
    })

    test('renders months ago', async () => {
        const date = dayjs().subtract(3, 'months').toISOString()
        const { container } = render(<TimeAgo isoDate={date} />)

        getByText(container, '3m ago')
    })

    test('renders years ago', async () => {
        const date = dayjs().subtract(3, 'years').toISOString()
        const { container } = render(<TimeAgo isoDate={date} />)

        getByText(container, '3y ago')
    })

    test('renders placeholder when isoDate is undefined', () => {
        const { container } = render(<TimeAgo />)
        expect(container.textContent).toBe('        ')
    })
})
