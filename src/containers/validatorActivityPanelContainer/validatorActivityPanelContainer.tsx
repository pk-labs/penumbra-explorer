// istanbul ignore file
import { FC, Suspense } from 'react'
import NumberPanel from '../../components/panels/numberPanel'
import ValidatorActivityPanelLoader from './validatorActivityPanelLoader'

export interface Props {
    className?: string
}

const ValidatorActivityPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                number={0}
                numberSuffix={<span className="ml-2">days</span>}
                title="Active since"
                {...props}
            />
        }
    >
        <ValidatorActivityPanelLoader {...props} />
    </Suspense>
)

export default ValidatorActivityPanelContainer
