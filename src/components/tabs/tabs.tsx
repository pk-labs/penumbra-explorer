import clsx from 'clsx'
import { FC, ReactElement } from 'react'
import { TabProps } from './tab'
import styles from './tabs.module.css'

interface Props {
    children?:
        | Array<
              | Array<ReactElement<TabProps>>
              | false
              | null
              | ReactElement<TabProps>
              | undefined
          >
        | ReactElement<TabProps>
    className?: string
}

const Tabs: FC<Props> = props => (
    <nav className={clsx(styles.root, props.className)}>{props.children}</nav>
)

export default Tabs
