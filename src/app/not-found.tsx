// istanbul ignore file
import clsx from 'clsx'
import { FC } from 'react'

const NotFoundPage: FC = async () => (
    <div
        className={clsx(
            'absolute top-[50vh] left-[50vw] flex -translate-1/2 items-center',
            'justify-center gap-6'
        )}
    >
        <span className="font-mono text-3xl font-medium">404</span>
        <span className="h-12 w-[1px] bg-(--surfaceLighter)" />
        <span>This page could not be found.</span>
    </div>
)

export default NotFoundPage
