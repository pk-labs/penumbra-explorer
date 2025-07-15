import {
    fireEvent,
    getByText,
    queryByText,
    render,
} from '@testing-library/react'
import ReadMore from './readMore'

jest.mock('motion/react', () => ({
    AnimatePresence: (props: any) => props.children,
    motion: {
        div: (props: any) => <div>{props.children}</div>,
        p: (props: any) => <p className={props.className}>{props.children}</p>,
    },
}))

describe('ReadMore', () => {
    test('renders paragraphs until min', async () => {
        const { container, rerender } = render(
            <ReadMore minParagraphs={2} text={'Foo\nBar\nHidden'} />
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
        expect(queryByText(container, 'Hidden')).toBeNull()

        rerender(<ReadMore minParagraphs={3} text={'Foo\nBar\nHidden'} />)

        getByText(container, 'Hidden')
    })

    test('expands paragraphs after min on button click', async () => {
        const { container } = render(
            <ReadMore minParagraphs={2} text={'Foo\nBar\nHidden'} />
        )

        getByText(container, 'Foo')
        getByText(container, 'Bar')
        expect(queryByText(container, 'Hidden')).toBeNull()

        fireEvent.click(getByText(container, 'Read more'))

        getByText(container, 'Hidden')
        expect(queryByText(container, 'Read more')).toBeNull()
    })

    test('applies CSS classes', async () => {
        const { container } = render(
            <ReadMore className="foo bar" minParagraphs={2} text={'Foo\nBar'} />
        )

        expect(getByText(container, 'Foo')).toHaveClass('foo bar')
        expect(getByText(container, 'Bar')).toHaveClass('foo bar')
    })
})
