/* istanbul ignore file */
import { Metadata } from 'next'
import { FC } from 'react'
import {
    BlockTable,
    Breadcrumb,
    Breadcrumbs,
    Container,
    Pagination,
} from '@/components'
import { rootTitle } from '@/lib/constants'
import { PartialBlockFragment } from '@/lib/graphql/generated/types'
import { loadBlocks } from '@/lib/loaders'

export const metadata: Metadata = {
    title: `Blocks - ${rootTitle}`,
}

interface Props {
    searchParams: Promise<{
        from?: string
    }>
}

const BlocksPage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    const fromParam = Number(searchParams.from)
    const limit = 20
    let blocks: PartialBlockFragment[] | undefined
    let fromNext: number | undefined
    let fromPrev: number | undefined

    if (Number.isInteger(fromParam)) {
        blocks = await loadBlocks({
            range: { from: fromParam, to: fromParam + limit },
        })

        if (blocks?.length) {
            blocks.sort((a, b) => b.height - a.height)
            fromPrev = fromParam + limit + 1
            fromNext = fromParam - limit - 1
        }
    } else {
        blocks = await loadBlocks({ latest: { limit } })

        if (blocks?.length) {
            fromNext = blocks[blocks.length - 1].height - limit - 1
        }
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explorer</Breadcrumb>
                <Breadcrumb>Blocks</Breadcrumb>
            </Breadcrumbs>
            <BlockTable
                blocks={blocks}
                footer={
                    <Pagination
                        fromNext={fromNext?.toString()}
                        fromPrev={fromPrev?.toString()}
                    />
                }
            />
        </Container>
    )
}

export default BlocksPage
