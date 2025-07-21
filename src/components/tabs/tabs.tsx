import { FC, ReactElement } from 'react'
import { classNames } from '@/lib/utils'
import Surface from '../surface'
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
    <Surface
        as="nav"
        className={classNames('flex h-9 items-center px-4', props.className)}
    >
        {props.children}
    </Surface>
)

export default Tabs
