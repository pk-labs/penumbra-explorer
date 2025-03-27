import { render } from '@testing-library/react'
import * as fathomClient from 'fathom-client'
import {
    ReadonlyURLSearchParams,
    usePathname,
    useSearchParams,
} from '@/lib/__tests__/__mocks__'
import PageViewTracker from './pageViewTracker'

jest.mock('fathom-client', () => ({
    load: jest.fn(),
    trackPageview: jest.fn(),
}))

describe('PageViewTracker', () => {
    test('renders nothing', async () => {
        const { container } = render(<PageViewTracker />)
        expect(container.firstChild).toBeNull()
    })

    test('does not track when ID not set', async () => {
        render(<PageViewTracker />)

        expect(fathomClient.load).not.toHaveBeenCalled()
        expect(fathomClient.trackPageview).not.toHaveBeenCalled()
    })

    test('tracks page views when ID set', async () => {
        const { rerender } = render(<PageViewTracker fathomId="foo" />)

        expect(fathomClient.load).toHaveBeenCalledWith('foo', { auto: false })

        expect(fathomClient.trackPageview).toHaveBeenCalledWith({
            referrer: '',
            url: '/',
        })

        usePathname.mockReturnValueOnce('/foo')

        useSearchParams.mockReturnValueOnce(
            new ReadonlyURLSearchParams({ bar: 'baz' })
        )

        rerender(<PageViewTracker fathomId="foo" />)

        expect(fathomClient.trackPageview).toHaveBeenCalledWith({
            referrer: '',
            url: '/foo?bar=baz',
        })
    })
})
