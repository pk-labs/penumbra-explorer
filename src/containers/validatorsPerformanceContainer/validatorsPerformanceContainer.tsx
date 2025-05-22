// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton, Table, TableCell, TableRow } from '@/components'
import ValidatorsPerformanceLoader, {
    Props,
} from './validatorsPerformanceLoader'

const ValidatorsPerformanceContainer: FC<Props> = props => (
    <Suspense
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
