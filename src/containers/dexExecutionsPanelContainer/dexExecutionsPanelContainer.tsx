// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import DexExecutionsPanelLoader from './dexExecutionsPanelLoader'

export interface Props {
    className?: string
}

const DexExecutionsPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                title="Number of executions"
            />
        }
    >
        <DexExecutionsPanelLoader {...props} />
    </Suspense>
)

export default DexExecutionsPanelContainer
