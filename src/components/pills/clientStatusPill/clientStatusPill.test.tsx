import { getByText, render } from '@testing-library/react'
import { ClientStatus } from '@/lib/graphql/generated/types'
import ClientStatusPill from './clientStatusPill'

describe('ClientStatusPill', () => {
    test('renders unknown status by default', async () => {
        const { container } = render(<ClientStatusPill />)
        getByText(container, 'Unknown')
    })

    test('renders active status', async () => {
        const { container } = render(
            <ClientStatusPill status={ClientStatus.Active} />
        )

        getByText(container, 'Active')
    })

    test('renders pending status', async () => {
        const { container } = render(
            <ClientStatusPill status={ClientStatus.Frozen} />
        )

        getByText(container, 'Frozen')
    })

    test('renders expired status', async () => {
        const { container } = render(
            <ClientStatusPill status={ClientStatus.Expired} />
        )

        getByText(container, 'Expired')
    })

    test('applies CSS classes', async () => {
        const { container } = render(<ClientStatusPill className="foo bar" />)
        expect(container.firstChild).toHaveClass('foo', 'bar')
    })
})
