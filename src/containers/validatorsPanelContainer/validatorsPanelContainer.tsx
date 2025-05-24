// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import ValidatorsPanelLoader, { Props } from './validatorsPanelLoader'

const ValidatorsPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                numberSuffix={
                    <span className="text-text-secondary text-2xl">/100</span>
                }
                title="Active validators / Validators limit"
            />
        }
    >
        <ValidatorsPanelLoader {...props} />
    </Suspense>
)

export default ValidatorsPanelContainer
