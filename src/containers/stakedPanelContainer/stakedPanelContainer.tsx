// istanbul ignore file
import Image from 'next/image'
import { FC, Suspense } from 'react'
import { penumbra } from '@/lib/images'
import NumberPanel from '../../components/panels/numberPanel'
import StakedPanelLoader from './stakedPanelLoader'

export interface Props {
    className?: string
}

const StakedPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberClassName="gap-2"
                numberPrefix={
                    <Image alt="UM" height={32} src={penumbra} width={32} />
                }
                numberSuffix="UM"
                title="Total staked"
                {...props}
            />
        }
    >
        <StakedPanelLoader {...props} />
    </Suspense>
)

export default StakedPanelContainer
