// istanbul ignore file
import clsx from 'clsx'
import { Link2 } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
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
import { getTransaction } from '@/lib/data'
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
    const transaction = await getTransaction(params.hash.toUpperCase())

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
                        <span className={styles.group}>
                            {shortenHash(transaction.hash)}
                            <CopyToClipboard
                                className={clsx(
                                    styles.icon,
                                    styles.copyToClipboard
                                )}
                                data={transaction.hash}
                                small
                            />
                        </span>
                    </Parameter>
                    <Parameter name="Block height">
                        <Link
                            className={clsx(styles.group, styles.link)}
                            href={`/block/${transaction.block.height}`}
                        >
                            {transaction.block.height}
                            <Link2
                                className={clsx(styles.icon, styles.link2)}
                                size={12}
                            />
                        </Link>
                    </Parameter>
                    <Parameter name="Time">
                        {transaction.block.createdAt}
                    </Parameter>
                </Parameters>
                {transaction.body.memo && <Memo />}
                <Actions actions={transaction.actions} />
                <Subsection title="Parameters">
                    <Parameters>
                        <Parameter name="Transaction fee">
                            {Number(transaction.body.parameters.fee.amount) /
                                1000000}{' '}
                            UM
                        </Parameter>
                        <Parameter name="Chain ID">
                            {transaction.body.parameters.chainId}
                        </Parameter>
                    </Parameters>
                </Subsection>
                {transaction.json && <JsonTree data={transaction.json} />}
            </View>
        </Container>
    )
}

export default TransactionViewPage
