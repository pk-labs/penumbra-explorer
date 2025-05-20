import { getByText, queryByText, render } from '@testing-library/react'

describe('Footer', () => {
    beforeEach(jest.resetModules)

    test('renders environment name and app version', async () => {
        jest.doMock('../../lib/constants', () => ({
            appVersion: '1.2.3',
            envName: 'test',
        }))

        const { default: Footer } = await import('./footer')
        const { container } = render(<Footer />)

        getByText(container, 'test-v1.2.3')
    })

    test('does not render environment name on production', async () => {
        jest.doMock('../../lib/constants', () => ({
            appVersion: '1.9.9',
            envName: 'prod',
        }))

        const { default: Footer } = await import('./footer')
        const { container } = render(<Footer />)

        expect(queryByText(container, 'prod-v1.9.9')).toBeNull()
        getByText(container, 'v1.9.9')
    })

    test('applies CSS classes', async () => {
        const { default: Footer } = await import('./footer')
        const { container } = render(<Footer className="foo bar" />)

        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
