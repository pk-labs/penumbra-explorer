import { FC, ReactElement } from 'react'
import { classNames } from '@/lib/utils'
import { ParameterProps } from './parameter'

interface Props {
    children?:
        | Array<
              | Array<ReactElement<ParameterProps>>
              | false
              | null
              | ReactElement<ParameterProps>
              | undefined
          >
        | ReactElement<ParameterProps>
    className?: string
}

const Parameters: FC<Props> = props => (
    <ul
        className={classNames(
            'bg-other-tonalFill5 flex flex-col gap-1 rounded-sm p-3',
            'text-text-secondary font-mono text-xs font-medium',
            props.className
        )}
    >
        {props.children}
    </ul>
)

export default Parameters
