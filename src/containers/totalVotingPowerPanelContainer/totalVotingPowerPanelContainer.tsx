// istanbul ignore file
import Image from 'next/image'
import { FC, Suspense } from 'react'
import { penumbra } from '@/lib/images'
import NumberPanel from '../../components/panels/numberPanel'
import TotalVotingPowerPanelLoader from './totalVotingPowerPanelLoader'

export interface Props {
    className?: string
}

const TotalVotingPowerPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberClassName="gap-2"
                numberPrefix={
                    <Image alt="UM" height={32} src={penumbra} width={32} />
                }
                numberSuffix="UM"
                title="Total voting power"
                {...props}
            />
        }
    >
        <TotalVotingPowerPanelLoader {...props} />
    </Suspense>
)

export default TotalVotingPowerPanelContainer
