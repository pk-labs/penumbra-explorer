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
        number={props.number}
        numberClassName="gap-2"
        numberPrefix={<Image alt="UM" height={32} src={penumbra} width={32} />}
        numberSuffix="UM"
        title="Total staked"
    />
)

export default StakedPanel
