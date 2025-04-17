// istanbul ignore file
import { FC } from 'react'
import { classNames, formatNumber } from '@/lib/utils'
import Button from '../button'
import Skeleton from '../skeleton'

interface Props {
    className?: string
    page: number
    pathname: string
    totalPages: number
}

const Pagination: FC<Props> = props => (
    <div
        className={classNames(
            'flex items-center justify-center gap-6',
            props.className
        )}
    >
        <Button
            className="font-normal"
            density="compact"
            disabled={props.page <= 1}
            href={
                props.page > 2
                    ? `${props.pathname}?page=${props.page - 1}`
                    : props.pathname
            }
        >
            Prev
        </Button>
        {props.page === 0 && props.totalPages === 0 ? (
            <Skeleton className="h-8 w-24" />
        ) : (
            <span className="text-sm">
                {formatNumber(props.page)} of {formatNumber(props.totalPages)}
            </span>
        )}
        <Button
            className="font-normal"
            density="compact"
            disabled={props.page >= props.totalPages}
            href={
                props.page < props.totalPages
                    ? `${props.pathname}?page=${props.page + 1}`
                    : `${props.pathname}?page=${props.totalPages}`
            }
        >
            Next
        </Button>
    </div>
)

export default Pagination
