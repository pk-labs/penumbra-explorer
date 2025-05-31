// istanbul ignore file
import { FC, Suspense } from 'react'
import NumberPanel from '../../components/panels/numberPanel'
import ValidatorActiveSincePanelLoader from './validatorActiveSincePanelLoader'

export interface Props {
    className?: string
    validatorId: string
}

const ValidatorActiveSincePanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                numberSuffix={<span className="ml-2">days</span>}
                title="Defined"
            />
        }
    >
        <ValidatorActiveSincePanelLoader {...props} />
    </Suspense>
)

export default ValidatorActiveSincePanelContainer
