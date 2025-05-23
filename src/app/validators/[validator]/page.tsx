// istanbul ignore file
import { FC } from 'react'
import { Breadcrumb, Breadcrumbs, Container } from '@/components'
import { LatestTransactionsContainer } from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

interface Props {
    params: Promise<{ validator: string }>
}

export const generateMetadata = async (props: Props) => {
    const params = await props.params
    const validator = params.validator

    return generatePageMetadata(
        `${validator} validator`,
        'TODO: Description',
        `/validators/${validator}`
    )
}

const ValidatorPage: FC<Props> = async props => {
    const params = await props.params
    const validator = params.validator

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb href="/validators">Validators</Breadcrumb>
            </Breadcrumbs>
            <div className="grid grid-cols-12 gap-4">
                <div
                    className={classNames(
                        'bg-other-tonalFill5 col-span-4 rounded-lg p-6',
                        'backdrop-blur-lg'
                    )}
                >
                    Validator {validator}
                </div>
                <LatestTransactionsContainer
                    className="col-span-8"
                    limit={10}
                    blockHeight
                    time
                />
            </div>
        </Container>
    )
}

export default ValidatorPage
