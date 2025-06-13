// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import DexPositionsPanelLoader from './dexPositionsPanelLoader'

export interface Props {
    className?: string
}

const DexPositionsPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                title="Total open positions"
            />
        }
    >
        <DexPositionsPanelLoader {...props} />
    </Suspense>
)

export default DexPositionsPanelContainer
