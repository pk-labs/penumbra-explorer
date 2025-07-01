// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    FilterSelector,
} from '@/components'
import {
    DexExecutionContainer,
    DexExecutionPanelContainer,
    DexPositionPanelContainer,
    DexPositionTableContainer,
} from '@/containers'
import { LiquidityPositionStateFilter } from '@/lib/graphql/generated/types'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Dex',
    'Explore DEX liquidity positions and swap executions on the Penumbra ' +
        'blockchain. View liquidity reserves, fee tier, execution routes and ' +
        'more on Noctis - a fast, secure, and privacy-focused explorer built ' +
        'for Penumbra blockchain.',
    '/dex'
)

interface Props {
    searchParams: Promise<{
        filter?: string
        page?: string
    }>
}

const DexPage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    const page = searchParams.page ? Number(searchParams.page) - 1 : 0

    if (Number.isNaN(page) || page < 0) {
        notFound()
    }

    const length = 13
    const offset = page * length

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>DEX</Breadcrumb>
            </Breadcrumbs>
            <div className="flex flex-col gap-4 sm:flex-row">
                <DexExecutionPanelContainer className="flex-1" />
                <DexPositionPanelContainer className="flex-1" />
            </div>
            <div className="mt-4 flex flex-col-reverse gap-4 lg:flex-row">
                <DexExecutionContainer />
                <DexPositionTableContainer
                    className="lg:min-w-0 lg:flex-1"
                    header={
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl font-medium">
                                Liquidity positions
                            </h1>
                            <FilterSelector
                                filters={['open', 'closed']}
                                selectedFilter={searchParams.filter}
                            />
                        </div>
                    }
                    limit={{ length, offset }}
                    stateFilter={
                        searchParams.filter === 'closed'
                            ? LiquidityPositionStateFilter.Closed
                            : LiquidityPositionStateFilter.Open
                    }
                    pagination
                />
            </div>
        </Container>
    )
}

export default DexPage
