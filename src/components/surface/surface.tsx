import { ElementType, FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'

interface Props {
    as?: ElementType
    children?: ReactNode
    className?: string
}

const Surface: FC<Props> = props => {
    const Element = props.as ?? 'div'

    return (
        <Element
            // Workaround for nested backdrop blur using before pseudo element
            className={classNames(
                'before:bg-other-tonalFill5 relative z-1 before:absolute',
                'before:inset-0 before:-z-1 before:rounded-lg',
                'before:backdrop-blur-lg',
                props.className
            )}
        >
            {props.children}
        </Element>
    )
}

export default Surface
