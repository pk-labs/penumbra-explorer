import { ArrowLeftIcon } from 'lucide-react'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../button'
import Container from '../container'

interface Props {
    message: string
    statusCode: number
}

const ErrorPage: FC<Props> = props => (
    <Container className="flex flex-col items-center">
        <div className="relative">
            <h2
                className={twMerge(
                    'font-mono text-[calc(1rem/16*150)]',
                    'leading-[calc(1rem/16*180)] font-bold blur-[5px]',
                    'sm:text-[calc(1rem/16*225)]',
                    'sm:leading-[calc(1rem/16*270)] sm:blur-[7.5px]',
                    'xl:text-[calc(1rem/16*300)]!',
                    'xl:leading-[calc(1rem/16*360)]! xl:blur-[10px]!'
                )}
            >
                {props.statusCode}
            </h2>
            <div
                className={twMerge(
                    'absolute bottom-1/2 left-1/2 z-10 h-3/7 w-3/4',
                    `backdrop-blur-lg`
                )}
            />
            <div
                className={twMerge(
                    'absolute top-1/2 right-1/2 z-10 h-3/7 w-3/4',
                    'backdrop-blur-lg'
                )}
            />
        </div>
        <h1 className="text-2xl text-(--textSecondary)">{props.message}</h1>
        <Button
            className={twMerge(
                'hover:border(--primaryLight) mt-16 h-12 rounded-lg border',
                'border-(--primary) bg-transparent',
                'transition-[background,border-color]',
                'hover:bg-[rgba(83,174,168,0.15)]'
            )}
            href="/"
        >
            <ArrowLeftIcon size={16} />
            Back to the homepage
        </Button>
    </Container>
)

export default ErrorPage
