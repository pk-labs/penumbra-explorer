import { FC, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
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
        className={twMerge(
            'flex flex-col gap-1 rounded-sm bg-(--surface) p-3',
            'font-mono text-xs font-medium text-(--textSecondary)',
            props.className
        )}
    >
        {props.children}
    </ul>
)

export default Parameters
