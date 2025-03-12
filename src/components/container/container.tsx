import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    className?: string
    narrow?: boolean
}

const Container: FC<Props> = props => (
    <div
        className={clsx(
            'mx-auto w-full px-8',
            props.narrow
                ? 'max-w-(--pageNarrowWidth)'
                : 'max-w-(--pageMaxWidth)',
            props.className
        )}
    >
        {props.children}
    </div>
)

export default Container
