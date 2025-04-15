import { FC, ReactElement } from 'react'
import { classNames } from '@/lib/utils'
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
        className={classNames(
            'bg-other-tonalFill5 relative flex h-9 items-center rounded-full',
            'px-4 backdrop-blur-[32px]',
            props.className
        )}
    >
        {props.children}
    </nav>
)

export default Tabs
