// istanbul ignore file
import { FC, Suspense } from 'react'
import NumberPanel from '../../components/panels/numberPanel'
import ValidatorDefinedPanelLoader from './validatorDefinedPanelLoader'

export interface Props {
    className?: string
}

const ValidatorDefinedPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                {...props}
                number={0}
                numberSuffix={<span className="ml-2">days</span>}
                title="Defined"
            />
        }
    >
        <ValidatorDefinedPanelLoader {...props} />
    </Suspense>
)

export default ValidatorDefinedPanelContainer
