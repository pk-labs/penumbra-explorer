import clsx from 'clsx'
import { FC, ReactElement } from 'react'
import { TabProps } from './tab'

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
    <nav
        className={clsx(
            'relative flex h-9 items-center rounded-full bg-(--surface) px-4',
            'backdrop-blur-[32px]',
            props.className
        )}
    >
        {props.children}
    </nav>
)

export default Tabs
