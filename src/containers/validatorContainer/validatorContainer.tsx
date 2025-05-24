// istanbul ignore file
import { FC, Suspense } from 'react'
import { Skeleton } from '@/components'
import { classNames } from '@/lib/utils'
import ValidatorLoader, { Props } from './validatorLoader'

const ValidatorContainer: FC<Props> = props => (
    <Suspense
        fallback={
            <section
                className={classNames(
                    'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg',
                    'p-6 backdrop-blur-lg',
                    props.className
                )}
            >
                <header className="flex items-center gap-2">
                    <img
                        alt={props.validator}
                        className="rounded-full"
                        height={40}
                        src="https://image-cdn.solana.fm/images/?imageUrl=https://bafkreihcgrvcp4ze7jjcgblux56idqnqbapmnqm2yc7ky5j6fpaonqtbdu.ipfs.nftstorage.link"
                        width={40}
                    />
                    <h1 className="flex-1 truncate text-2xl">
                        {props.validator}
                    </h1>
                </header>
                <Skeleton className="h-25" />
                <Skeleton className="h-25" />
            </section>
        }
    >
        <ValidatorLoader {...props} />
    </Suspense>
)

export default ValidatorContainer
