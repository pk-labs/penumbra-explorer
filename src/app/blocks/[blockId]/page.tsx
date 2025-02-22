/* istanbul ignore file */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockView, Breadcrumb, Breadcrumbs, Container } from '@/components'
import { rootTitle } from '@/lib/constants'
import { loadBlock } from '@/lib/loaders'

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
            <BlockView block={block} subtitle="1,057,456" title="Block view" />
        </Container>
    )
}

export default BlockViewPage
