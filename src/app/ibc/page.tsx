// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { IbcContainer } from '@/containers'
import { TimePeriod } from '@/lib/graphql/generated/types'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata('IBC', 'TODO: Description', '/ibc')

interface Props {
    searchParams: Promise<{
        period?: string
    }>
}

const IbcPage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    let timePeriod

    // TODO: Extract and refactor parsing/converting
    switch (searchParams.period) {
        case '24h':
            timePeriod = TimePeriod.Day
            break
        case '30d':
            timePeriod = TimePeriod.Month
            break
        case 'all':
            timePeriod = TimePeriod.All
            break
    }

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <IbcContainer timePeriod={timePeriod} />
        </Container>
    )
}

export default IbcPage
