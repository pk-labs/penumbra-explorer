import { FC } from 'react'
import { Panel, PanelProps } from '../panel'
import ShieldedPanelIcon from './shieldedPanelIcon'

export type Props = Pick<PanelProps, 'className' | 'number'>

const ShieldedPanel: FC<Props> = props => (
    <Panel
        className={props.className}
        number={props.number}
        numberPrefix="$"
        title={
            <>
                <ShieldedPanelIcon />
                <span>Total value shielded</span>
            </>
        }
    />
)

export default ShieldedPanel
