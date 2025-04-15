import { ElementType, FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

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
            className={classNames(
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
