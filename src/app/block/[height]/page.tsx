// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    CopyToClipboard,
    JsonTree,
    Parameter,
    Parameters,
    TransactionTable,
    View,
} from '@/components'
import { getBlock } from '@/lib/data'
import { formatNumber, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ height: string }>
}

export const generateMetadata = async (props: Props) => {
    const { height } = await props.params

    return generatePageMetadata(
        `Block ${height}`,
        `Explore ${height} block parameters, transactions, and other data ` +
            'with Noctis - a fast, secure, and privacy-focused explorer ' +
            'built for Penumbra blockchain.',
        `/block/${height}`
    )
}

const BlockViewPage: FC<Props> = async props => {
    const params = await props.params
    const block = await getBlock(Number(params.height))

    if (!block) {
        notFound()
    }

    return (
        <Container narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/blocks">Blocks</Breadcrumb>
            </Breadcrumbs>
            <View
                className={twMerge(
                    'from-[rgba(83,174,168,0.25)]!',
                    'to-[rgba(83,174,168,0.025)]!'
                )}
                subtitle={formatNumber(block.height)}
                title="Block view"
            >
                <Parameters>
                    <Parameter name="Block height">
                        {block.height}
                        <CopyToClipboard
                            className="-mr-0.5 text-(--text)"
                            data={block.height.toString()}
                            small
                        />
                    </Parameter>
                    <Parameter name="Time">{block.createdAt}</Parameter>
                    {/*<Parameter name="Proposer">-</Parameter>*/}
                    <Parameter name="Txs">
                        {block.transactions.length}
                    </Parameter>
                </Parameters>
                <TransactionTable
                    emptyStateMessage="This block does not contain any transactions"
                    transactions={block.transactions}
                    embedded
                />
                <JsonTree data={block} />
            </View>
        </Container>
    )
}

export default BlockViewPage
