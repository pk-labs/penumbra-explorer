// istanbul ignore file
import { Link2Icon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
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
import { appName } from '@/lib/constants'
import { getTransaction } from '@/lib/data'
import { shortenHash } from '@/lib/utils'

interface Props {
    params: Promise<{ hash: string }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const params = await props.params
    const title = `Transaction ${params.hash} - ${appName}`
    const description =
        `Explore ${params.hash} transaction parameters, actions, and other ` +
        'data with Noctis - a fast, secure, and privacy-focused explorer ' +
        'built for Penumbra blockchain.'

    return {
        description,
        openGraph: {
            description,
            title,
        },
        title,
        twitter: {
            description,
            title,
        },
    }
}

const TransactionViewPage: FC<Props> = async props => {
    const params = await props.params
    const transaction = await getTransaction(params.hash.toUpperCase())

    if (!transaction) {
        notFound()
    }

    return (
        <Container narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/txs">Transactions</Breadcrumb>
            </Breadcrumbs>
            <View
                className={twMerge(
                    'from-[rgba(193,166,204,0.25)]!',
                    'to-[rgba(193,166,204,0.025)]!'
                )}
                subtitle={transaction.hash}
                title="Transaction view"
            >
                <Parameters>
                    <Parameter name="Transaction hash">
                        {shortenHash(transaction.hash)}
                        <CopyToClipboard
                            className="-mr-0.5 text-(--text)"
                            data={transaction.hash}
                            small
                        />
                    </Parameter>
                    <Parameter name="Block height">
                        <Link
                            className={twMerge(
                                'inline-flex items-center gap-1 text-inherit',
                                'hover:text-(--primaryLight)'
                            )}
                            href={`/block/${transaction.block.height}`}
                        >
                            {transaction.block.height}
                            <Link2Icon
                                className="ml-1 text-(--text)"
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
                            <span className="text-(--negativeLight)">
                                {Number(
                                    transaction.body.parameters.fee.amount
                                ) / 1000000}{' '}
                                UM
                            </span>
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
