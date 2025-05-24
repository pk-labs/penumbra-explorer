// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Skeleton,
    Table,
    TableCell,
    TableRow,
    ValidatorsPerformanceTableProps,
} from '@/components'
import ValidatorsPerformanceLoader from './validatorsPerformanceLoader'

export interface Props
    extends Omit<ValidatorsPerformanceTableProps, 'validators'> {
    filter?: string
}

const ValidatorsPerformanceContainer: FC<Props> = props => (
    <Suspense
        key={props.filter}
        fallback={
            <Table {...props}>
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: 56 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="h-15">
                                <Skeleton className="h-9" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <ValidatorsPerformanceLoader {...props} />
    </Suspense>
)

export default ValidatorsPerformanceContainer
