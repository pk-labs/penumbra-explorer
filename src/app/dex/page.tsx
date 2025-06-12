// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container, NumberPanel } from '@/components'
import { DexTableContainer } from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Validators',
    'Discover active Penumbra Validators and track key metrics like Status, ' +
        'Voting power, Uptime, and Commission. Find the best Validator on ' +
        'Noctis - a fast, secure, and privacy-focused explorer built for ' +
        'Penumbra blockchain.',
    '/validators'
)

interface Props {
    searchParams: Promise<{ page?: string }>
}

const DexPage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    const page = searchParams.page ? Number(searchParams.page) - 1 : 0

    if (Number.isNaN(page) || page < 0) {
        notFound()
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>DEX</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4">
                <NumberPanel
                    className="col-span-full sm:col-span-6"
                    number={43123}
                    title="Number of executions"
                />
                <NumberPanel
                    className="col-span-full sm:col-span-6"
                    number={450}
                    title="Total open positions"
                />
                <section
                    className={classNames(
                        'bg-other-tonalFill5 col-span-full flex flex-col',
                        'gap-4 rounded-lg p-6 backdrop-blur-lg lg:col-span-6 xl:col-span-4'
                    )}
                >
                    <h2 className="text-2xl font-medium">Latest executions</h2>
                </section>
                <DexTableContainer
                    className="col-span-full lg:col-span-6 xl:col-span-8"
                    header={
                        <h1 className="text-2xl font-medium">
                            Liquidity positions
                        </h1>
                    }
                    limit={{ length: 13 }}
                />
            </div>
        </Container>
    )
}

export default DexPage
