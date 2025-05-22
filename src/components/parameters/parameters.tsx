import { FC, ReactElement } from 'react'
import { classNames } from '@/lib/utils'
import { Props as ParameterProps } from './parameter'

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
    title?: string
}

// TODO: Make more flexible to allow different configurations (see validators)
const Parameters: FC<Props> = props => (
    <div
        className={classNames(
            'bg-other-tonalFill5 flex flex-col gap-1 rounded-sm p-3',
            props.className
        )}
    >
        {props.title && <h4 className="text-sm">{props.title}</h4>}
        <ul
            className={classNames(
                'text-text-secondary flex flex-col gap-1 font-mono text-sm',
                'font-medium'
            )}
        >
            {props.children}
        </ul>
    </div>
)

export default Parameters
