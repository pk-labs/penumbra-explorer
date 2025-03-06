/* istanbul ignore file */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    JsonTree,
    Parameter,
    Parameters,
    TransactionTable,
    View,
} from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadBlock } from '@/lib/loaders'
import { formatNumber } from '@/lib/utils'
import styles from './page.module.css'

interface Props {
    params: Promise<{ height: string }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => ({
    title: `Block ${(await props.params).height} - ${rootTitle}`,
})

const BlockViewPage: FC<Props> = async props => {
    const params = await props.params
    const block = await loadBlock(Number(params.height))

    if (!block) {
        notFound()
    }

    return (
        <Container className={styles.root} narrow>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb href="/blocks">Blocks</Breadcrumb>
            </Breadcrumbs>
            <View
                className={styles.view}
                subtitle={formatNumber(block.height)}
                title="Block view"
            >
                <Parameters>
                    <Parameter name="Block height">{block.height}</Parameter>
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
