import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { Panel, PanelProps } from '../panel'
import BlockPanelChart from './blockPanelChart'
import BlockPanelIcon from './blockPanelIcon'

export interface Props extends Pick<PanelProps, 'className' | 'number'> {
    fallback?: boolean
}

const BlockPanel: FC<Props> = props => (
    <Panel
        className={classNames(
            'from-[rgba(83,174,168,0.25)] to-[rgba(83,174,168,0.03)]',
            props.className
        )}
        number={props.number}
        title={
            <>
                <BlockPanelIcon />
                <span>Current block</span>
            </>
        }
    >
        <BlockPanelChart animate={!props.fallback} />
    </Panel>
)

export default BlockPanel
