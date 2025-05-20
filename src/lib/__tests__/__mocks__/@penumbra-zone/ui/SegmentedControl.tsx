/* eslint-disable react/jsx-no-bind */
import {
    SegmentedControlItemProps,
    SegmentedControlProps,
} from '@penumbra-zone/ui/SegmentedControl'
import { Children, FC, ReactElement } from 'react'
import { classNames } from '@/lib/utils'

export const SegmentedControl: FC<SegmentedControlProps> = props => {
    return (
        <ul>
            {Children.map(props.children, (child, i) => {
                const element = child as ReactElement<SegmentedControlItemProps>
                const onClick = () => props.onChange(element.props.value)

                return (
                    <li
                        key={i}
                        className={classNames(
                            props.value === element.props.value && 'active'
                        )}
                        onClick={onClick}
                    >
                        {element.props.value}
                    </li>
                )
            })}
        </ul>
    )
}
