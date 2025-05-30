// istanbul ignore file
import Image from 'next/image'
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import { penumbra } from '@/lib/images'
import ActiveVotingPowerPanelLoader from './activeVotingPowerPanelLoader'

export interface Props {
    className?: string
}

const ActiveVotingPowerPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberClassName="gap-2"
                numberPrefix={
                    <Image alt="UM" height={32} src={penumbra} width={32} />
                }
                numberSuffix="UM"
                title="Active voting power"
                {...props}
            />
        }
    >
        <ActiveVotingPowerPanelLoader {...props} />
    </Suspense>
)

export default ActiveVotingPowerPanelContainer
