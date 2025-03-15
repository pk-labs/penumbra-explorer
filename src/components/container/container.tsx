import { ElementType, FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    as?: ElementType
    children?: ReactNode
    className?: string
    narrow?: boolean
}

const Container: FC<Props> = props => {
    const Element = props.as ?? 'div'

    return (
        <Element
            className={twMerge(
                'mx-auto w-full px-4 md:px-8',
                props.narrow
                    ? 'max-w-(--pageNarrowWidth)'
                    : 'max-w-(--pageMaxWidth)',
                props.className
            )}
        >
            {props.children}
        </Element>
    )
}

export default Container
