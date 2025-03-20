// istanbul ignore file
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import {
    BlockTable,
    Breadcrumb,
    Breadcrumbs,
    Container,
    Pagination,
} from '@/components'
import { appName } from '@/lib/constants'
import { getBlocks } from '@/lib/data'
import { PartialBlockFragment } from '@/lib/graphql/generated/types'

const title = `Blocks - ${appName}`

const description =
    'Explore Penumbra blockchain blocks, transactions, and other data ' +
    'with Noctis - a fast, secure, and privacy-focused explorer built ' +
    'for Penumbra blockchain.'

export const metadata: Metadata = {
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
        blocks = await getBlocks({
            range: { from: fromParam, to: fromParam + limit - 1 },
        })

        if (blocks?.length) {
            blocks.sort((a, b) => b.height - a.height)
            fromPrev = fromParam + limit

            fromNext =
                blocks[blocks.length - 1].height > 1
                    ? Math.max(fromParam - limit, 1)
                    : undefined
        } else {
            redirect('/blocks')
        }
    } else {
        blocks = await getBlocks({ latest: { limit } })

        if (blocks?.length) {
            const { height } = blocks[blocks.length - 1]
            fromNext = height > 1 ? Math.max(height - limit, 1) : undefined
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
