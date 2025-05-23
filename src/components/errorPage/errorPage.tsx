import { FC } from 'react'
import { classNames } from '@/lib/utils'
import Button from '../button'
import Container from '../container'

interface Props {
    message: string
    statusCode: number
}

const ErrorPage: FC<Props> = props => (
    <Container className="mt-20! flex flex-col items-center">
        <div className="relative">
            <h2
                className={classNames(
                    'font-mono text-[calc(1rem/16*208)]',
                    'leading-[calc(1rem/16*250)] font-bold blur-[7px]',
                    'sm:text-[calc(1rem/16*300)]',
                    'sm:leading-[calc(1rem/16*360)]! sm:blur-[10px]!'
                )}
            >
                {props.statusCode}
            </h2>
            <div
                className={classNames(
                    'absolute bottom-1/2 left-1/2 z-10 h-3/7 w-3/4',
                    `backdrop-blur-lg`
                )}
            />
            <div
                className={classNames(
                    'absolute top-1/2 right-1/2 z-10 h-3/7 w-3/4',
                    'backdrop-blur-lg'
                )}
            />
        </div>
        <h1 className="text-text-secondary text-2xl">{props.message}</h1>
        <Button
            actionType="accent"
            className="mt-16"
            href="/"
            icon="ArrowLeft"
            priority="secondary"
        >
            Back to the homepage
        </Button>
    </Container>
)

export default ErrorPage
