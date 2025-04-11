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
                number={<Skeleton className="my-1 h-8 w-30 sm:w-34" />}
            />
        }
    >
        <TransactionPanelLoader {...props} />
    </Suspense>
)

export default TransactionPanelContainer
