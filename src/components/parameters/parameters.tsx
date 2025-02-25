import clsx from 'clsx'
import { FC, ReactElement } from 'react'
import { ParameterProps } from './parameter'
import styles from './parameters.module.css'

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
    <ul className={clsx(styles.root, props.className)}>{props.children}</ul>
)

export default Parameters
