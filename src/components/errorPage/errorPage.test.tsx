import { getByText, render } from '@testing-library/react'
import ErrorPage from './errorPage'

describe('ErrorPage', () => {
    test('renders status code and message', async () => {
        const { container } = render(
            <ErrorPage message="Foo" statusCode={404} />
        )

        getByText(container, 404)
        getByText(container, 'Foo')
    })
})
