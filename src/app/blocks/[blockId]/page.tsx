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
    params: Promise<{
        blockId: string
    }>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => ({
    title: `Block ${(await props.params).blockId} - ${rootTitle}`,
})

const BlockViewPage: FC<Props> = async props => {
    const params = await props.params
    const block = await loadBlock(Number(params.blockId))

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
                className={styles.view}
                subtitle={formatNumber(block.height)}
                title="Block view"
            >
                <Parameters>
                    <Parameter name="Block height">{block.height}</Parameter>
                    <Parameter name="Time">{block.createdAt}</Parameter>
                    <Parameter name="Proposer">-</Parameter>
                    <Parameter name="Txs">-</Parameter>
                </Parameters>
                <TransactionTable
                    className={styles.table}
                    transactions={block.transactions}
                />
                <JsonTree data={block} />
            </View>
        </Container>
    )
}

export default BlockViewPage
