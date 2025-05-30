// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import MinValidatorStakePanelLoader from './minValidatorStakePanelLoader'

export interface Props {
    className?: string
}

const MinValidatorStakePanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberClassName="gap-2"
                numberSuffix="UM"
                title="Min validator stake"
                {...props}
            />
        }
    >
        <MinValidatorStakePanelLoader {...props} />
    </Suspense>
)

export default MinValidatorStakePanelContainer
