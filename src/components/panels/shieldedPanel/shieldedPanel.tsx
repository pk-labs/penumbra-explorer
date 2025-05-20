import Image from 'next/image'
import { FC } from 'react'
import Panel from '../panel'
import shieldedPanelIcon from './shieldedPanelIcon.svg'

interface Props {
    className?: string
    number?: number
}

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
