import Image from 'next/image'
import { FC } from 'react'
import { Panel, PanelProps } from '../panel'
import shieldedPanelIcon from './shieldedPanelIcon.svg'

export type Props = Pick<PanelProps, 'className' | 'number'>

const ShieldedPanel: FC<Props> = props => (
    <Panel
        className={props.className}
        number={props.number}
        numberPrefix="$"
        title={
            <>
                <Image alt="Shielded panel" src={shieldedPanelIcon} />
                <span>Total value shielded</span>
            </>
        }
    />
)

export default ShieldedPanel
