// istanbul ignore file
import { FC, Suspense } from 'react'
import { TransactionPanel } from '@/components'
import TransactionPanelLoader, { Props } from './transactionPanelLoader'

const TransactionPanelContainer: FC<Props> = props => (
    <Suspense fallback={<TransactionPanel className={props.className} />}>
        <TransactionPanelLoader {...props} />
    </Suspense>
)

export default TransactionPanelContainer
