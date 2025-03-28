import {
    Children,
    cloneElement,
    FC,
    isValidElement,
    ReactElement,
    ReactNode,
} from 'react'
import { twMerge } from 'tailwind-merge'

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
            className={twMerge(
                'h-12 px-3 text-left text-sm font-medium whitespace-nowrap',
                props.header
                    ? 'border-b border-(--surfaceLighter) ' +
                          'text-text-secondary capitalize'
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
                    className: twMerge(
                        element.props.className ?? '',
                        'align-middle not-last:mr-2'
                    ),
                })
            })}
        </Element>
    )
}

export default TableCell
