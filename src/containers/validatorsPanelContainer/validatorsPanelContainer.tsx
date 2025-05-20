// istanbul ignore file
import { FC, Suspense } from 'react'
import { ValidatorsPanel } from '@/components'
import ValidatorsPanelLoader, { Props } from './validatorsPanelLoader'

const ValidatorsPanelContainer: FC<Props> = props => (
    <Suspense fallback={<ValidatorsPanel className={props.className} />}>
        <ValidatorsPanelLoader {...props} />
    </Suspense>
)

export default ValidatorsPanelContainer
