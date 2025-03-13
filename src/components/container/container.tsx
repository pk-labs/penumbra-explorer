import clsx from 'clsx'
import { ElementType, FC, ReactNode } from 'react'

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
            className={clsx(
                'mx-auto w-full px-8',
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
