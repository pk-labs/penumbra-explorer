// istanbul ignore file
import { FC, Suspense } from 'react'
import Skeleton from '../../skeleton'
import { Table, TableCell, TableRow } from '../table'
import BlockTableLoader, { Props } from './blockTableLoader'

const BlockTableContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <Table
                actions={props.actions}
                className={props.className}
                title={props.title}
            >
                <thead>
                    <TableRow>
                        <TableCell header>
                            <Skeleton className="h-6" />
                        </TableCell>
                    </TableRow>
                </thead>
                <tbody>
                    {Array.from({ length: props.limit }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="h-6" />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        }
    >
        <BlockTableLoader {...props} />
    </Suspense>
)

export default BlockTableContainer
