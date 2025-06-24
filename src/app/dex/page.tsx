// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    DexExecutionContainer,
    DexExecutionPanelContainer,
    DexPositionPanelContainer,
    DexPositionTableContainer,
} from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata('Dex', 'TODO: Description', '/dex')

interface Props {
    searchParams: Promise<{ page?: string }>
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
            <div className="grid grid-cols-12 gap-4">
                <DexExecutionPanelContainer className="col-span-full sm:col-span-6" />
                <DexPositionPanelContainer className="col-span-full sm:col-span-6" />
                <DexExecutionContainer className="col-span-full lg:col-span-6 xl:col-span-4" />
                <DexPositionTableContainer
                    className="col-span-full lg:col-span-6 xl:col-span-8"
                    header={
                        <h1 className="text-2xl font-medium">
                            Liquidity positions
                        </h1>
                    }
                    limit={{ length, offset }}
                    pagination
                />
            </div>
        </Container>
    )
}

export default DexPage
