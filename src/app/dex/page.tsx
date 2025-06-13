// istanbul ignore file
import { faker } from '@faker-js/faker'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import {
    DexExecutionsPanelContainer,
    DexPositionsPanelContainer,
    DexPositionsTableContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'
import Collapsible from '../../components/collapsible'

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

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>DEX</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4">
                <DexExecutionsPanelContainer className="col-span-full sm:col-span-6" />
                <DexPositionsPanelContainer className="col-span-full sm:col-span-6" />
                <section
                    className={classNames(
                        'bg-other-tonalFill5 col-span-full flex flex-col',
                        'gap-10 rounded-lg p-6 backdrop-blur-lg lg:col-span-6',
                        'xl:col-span-4'
                    )}
                >
                    <h2 className="text-2xl font-medium">Latest executions</h2>
                    <Collapsible
                        header={
                            <>
                                <span>
                                    {faker.lorem.words({
                                        max: 3,
                                        min: 1,
                                    })}
                                </span>
                                <span>{faker.lorem.word()}</span>
                            </>
                        }
                    >
                        {faker.lorem.paragraphs({ max: 3, min: 1 })}
                    </Collapsible>
                    <Collapsible
                        header={
                            <>
                                <span>
                                    {faker.lorem.words({
                                        max: 3,
                                        min: 1,
                                    })}
                                </span>
                                <span>{faker.lorem.word()}</span>
                            </>
                        }
                    >
                        {faker.lorem.paragraphs({ max: 3, min: 1 })}
                    </Collapsible>
                    <Collapsible
                        header={
                            <>
                                <span>
                                    {faker.lorem.words({
                                        max: 3,
                                        min: 1,
                                    })}
                                </span>
                                <span>{faker.lorem.word()}</span>
                            </>
                        }
                    >
                        {faker.lorem.paragraphs({ max: 3, min: 1 })}
                    </Collapsible>
                    <Collapsible
                        header={
                            <>
                                <span>
                                    {faker.lorem.words({
                                        max: 3,
                                        min: 1,
                                    })}
                                </span>
                                <span>{faker.lorem.word()}</span>
                            </>
                        }
                    >
                        {faker.lorem.paragraphs({ max: 3, min: 1 })}
                    </Collapsible>
                    <Collapsible
                        header={
                            <>
                                <span>
                                    {faker.lorem.words({
                                        max: 3,
                                        min: 1,
                                    })}
                                </span>
                                <span>{faker.lorem.word()}</span>
                            </>
                        }
                    >
                        {faker.lorem.paragraphs({ max: 3, min: 1 })}
                    </Collapsible>
                </section>
                <DexPositionsTableContainer
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
