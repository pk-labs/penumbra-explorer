/* istanbul ignore file */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Actions,
    Breadcrumb,
    Breadcrumbs,
    Container,
    CopyToClipboard,
    JsonTree,
    Memo,
    Parameter,
    Parameters,
    Subsection,
    View,
} from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadTransaction } from '@/lib/loaders'
import { shortenHash } from '@/lib/utils'
import styles from './page.module.css'

interface Props {
    params: Promise<{ hash: string }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => ({
    title: `Transaction ${(await props.params).hash} - ${rootTitle}`,
})

const TransactionViewPage: FC<Props> = async props => {
    const params = await props.params
    const transaction = await loadTransaction(params.hash.toUpperCase())

    if (!transaction) {
        notFound()
    }

    return (
        <Container className={styles.root} narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/txs">Transactions</Breadcrumb>
            </Breadcrumbs>
            <View
                className={styles.view}
                subtitle={transaction.hash}
                title="Transaction view"
            >
                <Parameters>
                    <Parameter name="Transaction hash">
                        {shortenHash(transaction.hash)}
                        <CopyToClipboard
                            data={transaction.hash}
                            iconSize={14}
                        />
                    </Parameter>
                    <Parameter name="Block height">
                        {transaction.block.height}
                    </Parameter>
                    <Parameter name="Time">
                        {transaction.block.createdAt}
                    </Parameter>
                </Parameters>
                {transaction.body.memo && <Memo />}
                <Actions actions={transaction.body.actions} />
                <Subsection title="Parameters">
                    <Parameters>
                        <Parameter name="Transaction fee">
                            {Number(transaction.body.parameters.fee.amount) /
                                1000}{' '}
                            UM
                        </Parameter>
                        <Parameter name="Chain ID">
                            {transaction.body.parameters.chainId}
                        </Parameter>
                    </Parameters>
                </Subsection>
                <JsonTree data={transaction} />
            </View>
        </Container>
    )
}

export default TransactionViewPage
