import {
    Children,
    cloneElement,
    FC,
    isValidElement,
    ReactElement,
    ReactNode,
} from 'react'
import { classNames } from '@/lib/utils'

export interface Props {
    children?: ReactNode
    className?: string
    colSpan?: number
    header?: boolean
}

const TableCell: FC<Props> = props => {
    const Element = props.header ? 'th' : 'td'

    return (
        <Element
            className={classNames(
                'h-12 truncate px-3 text-left text-sm font-medium',
                props.header
                    ? 'border-other-tonalFill10 text-text-secondary border-b ' +
                          'align-middle'
                    : 'font-mono',
                props.className
            )}
            colSpan={props.colSpan}
        >
            {Children.map(props.children, child => {
                if (!isValidElement(child)) {
                    return child
                }

                const element = child as ReactElement<{ className?: string }>

                return cloneElement(element, {
                    className: classNames(
                        element.props.className ?? '',
                        'align-middle not-last:mr-2'
                    ),
                })
            })}
        </Element>
    )
}

export default TableCell
