import Image from 'next/image'
import { FC } from 'react'
import { NumberPanel } from '../numberPanel'
import shieldedPanelIcon from './shieldedPanelIcon.svg'

interface Props {
    className?: string
    number: number
}

const ShieldedPanel: FC<Props> = props => (
    <NumberPanel
        className={props.className}
        headerClassName="gap-2"
        number={props.number}
        numberPrefix="$"
        title={
            <>
                <Image alt="Shielded panel" src={shieldedPanelIcon} />
                <span>Total value shielded</span>
            </>
        }
        titleClassName="text-base font-medium"
    />
)

export default ShieldedPanel
