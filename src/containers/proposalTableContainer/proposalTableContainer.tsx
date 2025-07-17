// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Pagination,
    ProposalTableProps,
    Skeleton,
    Table,
    TableCell,
    TableRow,
} from '@/components'
import ProposalTableLoader from './proposalTableLoader'

export interface Props
    extends Omit<ProposalTableProps, 'footer' | 'proposals'> {
    limit: {
        length: number
        offset?: number
    }
    pagination?: boolean
}

const ProposalTableContainer: FC<Props> = props => (
    <Suspense
        key={JSON.stringify(props.limit)}
        fallback={
            <Table
                className={props.className}
                footer={
                    props.pagination ? (
                        <Pagination page={0} totalPages={0} />
                    ) : undefined
                }
                header={props.header}
            >
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: props.limit.length }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="h-20">
                                <Skeleton className="h-13" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <ProposalTableLoader {...props} />
    </Suspense>
)

export default ProposalTableContainer
