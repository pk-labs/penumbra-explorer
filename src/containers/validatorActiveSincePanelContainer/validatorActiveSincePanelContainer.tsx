// istanbul ignore file
import { FC, Suspense } from 'react'
import { Panel, Skeleton } from '@/components'
import ValidatorActiveSincePanelLoader from './validatorActiveSincePanelLoader'

export interface Props {
    className?: string
    validatorId: string
}

const ValidatorActiveSincePanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Panel
                className={props.className}
                header={<Skeleton className="mt-1 h-9 w-34" />}
                title="Defined"
            />
        }
    >
        <ValidatorActiveSincePanelLoader {...props} />
    </Suspense>
)

export default ValidatorActiveSincePanelContainer
