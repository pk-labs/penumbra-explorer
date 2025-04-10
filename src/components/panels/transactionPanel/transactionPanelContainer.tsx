// istanbul ignore file
import { FC, Suspense } from 'react'
import TransactionPanel from './transactionPanel'
import TransactionPanelLoader, { Props } from './transactionPanelLoader'

const TransactionPanelContainer: FC<Props> = props => (
    <Suspense
        fallback={<TransactionPanel className={props.className} number={0} />}
    >
        <TransactionPanelLoader {...props} />
    </Suspense>
)

export default TransactionPanelContainer
