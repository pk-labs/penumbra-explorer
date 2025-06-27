// istanbul ignore file
import { FC, Suspense } from 'react'
import { NumberPanel } from '@/components'
import DexPositionPanelLoader from './dexPositionPanelLoader'

export interface Props {
    className?: string
}

const DexPositionPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <NumberPanel
                className={props.className}
                number={0}
                title="Total open positions"
            />
        }
    >
        <DexPositionPanelLoader {...props} />
    </Suspense>
)

export default DexPositionPanelContainer
