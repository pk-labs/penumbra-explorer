// istanbul ignore file
import { FC, Suspense } from 'react'
import Skeleton from '../../skeleton'
import TransactionPanel from './transactionPanel'
import TransactionPanelLoader, { Props } from './transactionPanelLoader'

const TransactionPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <TransactionPanel
                className={props.className}
                number={<Skeleton className="mt-2 h-8" />}
            />
        }
    >
        <TransactionPanelLoader {...props} />
    </Suspense>
)

export default TransactionPanelContainer
