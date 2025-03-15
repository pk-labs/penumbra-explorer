// istanbul ignore file
import { Metadata } from 'next'
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
import { rootTitle } from '@/lib/constants'
import { getBlock } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

interface Props {
    params: Promise<{ height: string }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => ({
    title: `Block ${(await props.params).height} - ${rootTitle}`,
})

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
