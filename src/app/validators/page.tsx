// istanbul ignore file
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import {
    StakedPanelContainer,
    UnbondingPanelContainer,
    ValidatorParametersContainer,
    ValidatorsPanelContainer,
} from '@/containers'
import { classNames, generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'Validators',
    'TODO: Description',
    '/validators'
)

const ValidatorsPage: FC = () => (
    <Container>
        <Breadcrumbs>
            <Breadcrumb href="/">Explore</Breadcrumb>
            <Breadcrumb>Validators</Breadcrumb>
        </Breadcrumbs>
        <div className="grid grid-cols-6 gap-4">
            <StakedPanelContainer className="col-span-6 md:col-span-2" />
            <ValidatorsPanelContainer
                className={classNames('col-span-6 sm:col-span-3 md:col-span-2')}
            />
            <UnbondingPanelContainer
                className={classNames('col-span-6 sm:col-span-3 md:col-span-2')}
            />
        </div>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row-reverse">
            <ValidatorParametersContainer className="lg:w-69.5 xl:w-82.5" />
            <Table
                className="flex-1"
                header={
                    <h2 className="text-2xl font-medium">
                        Validators performance
                    </h2>
                }
            >
                <thead>
                    <TableRow>
                        <TableCell header>Name</TableCell>
                        <TableCell header>Status</TableCell>
                        <TableCell header>Voting power</TableCell>
                        <TableCell header>Uptime %</TableCell>
                        <TableCell header>Active since</TableCell>
                        <TableCell header>Commission</TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </tbody>
            </Table>
        </div>
    </Container>
)

export default ValidatorsPage
