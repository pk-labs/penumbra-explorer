// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import DexExecutionPanelLoader from './dexExecutionPanelLoader'

export interface Props {
    className?: string
}

const DexExecutionPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                title="Number of executions"
            />
        }
    >
        <DexExecutionPanelLoader {...props} />
    </Suspense>
)

export default DexExecutionPanelContainer
