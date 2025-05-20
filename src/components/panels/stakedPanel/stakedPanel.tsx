import Image from 'next/image'
import { FC } from 'react'
import { penumbra } from '@/lib/images'
import Panel from '../panel'

interface Props {
    className?: string
    number?: number
}

const StakedPanel: FC<Props> = props => (
    <Panel
        className={props.className}
        headerClassName="gap-0"
        number={props.number}
        numberPrefix={<Image alt="UM" height={32} src={penumbra} width={32} />}
        numberSuffix="UM"
        title="Total staked"
        titleClassName="text-xs font-normal"
    />
)

export default StakedPanel
