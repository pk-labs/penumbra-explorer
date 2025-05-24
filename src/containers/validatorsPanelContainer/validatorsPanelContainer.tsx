// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import ValidatorsPanelLoader from './validatorsPanelLoader'

export interface Props {
    className?: string
}

const ValidatorsPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberSuffix={
                    <span className="text-text-secondary text-2xl">/100</span>
                }
                title="Active validators / Validators limit"
                {...props}
            />
        }
    >
        <ValidatorsPanelLoader {...props} />
    </Suspense>
)

export default ValidatorsPanelContainer
