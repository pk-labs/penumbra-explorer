import { ElementType, FC, ReactNode } from 'react'
import { classNames } from '@/lib/utils'
import styles from './container.module.css'

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
                styles.root,
                props.narrow && styles.narrow,
                props.className
            )}
        >
            {props.children}
        </Element>
    )
}

export default Container
