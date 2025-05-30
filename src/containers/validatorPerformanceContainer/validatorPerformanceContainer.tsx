// istanbul ignore file
import { FC, Suspense } from 'react'
import {
    Skeleton,
    Table,
    TableCell,
    TableRow,
    ValidatorPerformanceTableProps,
} from '@/components'
import ValidatorPerformanceLoader from './validatorPerformanceLoader'

export interface Props
    extends Omit<ValidatorPerformanceTableProps, 'validators'> {
    filter?: string
}

const ValidatorPerformanceContainer: FC<Props> = props => (
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
        <ValidatorPerformanceLoader {...props} />
    </Suspense>
)

export default ValidatorPerformanceContainer
