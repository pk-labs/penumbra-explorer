// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import ActiveValidatorsPanelLoader from './activeValidatorsPanelLoader'

export interface Props {
    className?: string
}

const ActiveValidatorsPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                {...props}
                number={0}
                numberSuffix={
                    <span className="text-text-secondary text-2xl">/0</span>
                }
                title="Active validators / Validators limit"
            />
        }
    >
        <ActiveValidatorsPanelLoader {...props} />
    </Suspense>
)

export default ActiveValidatorsPanelContainer
