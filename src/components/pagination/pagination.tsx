// istanbul ignore file
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import Button from '../button'

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
        <span className="text-sm">
            {props.page} of {props.totalPages}
        </span>
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
