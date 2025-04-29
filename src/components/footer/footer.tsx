import { MailIcon } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { logoMinimal, penumbra } from '@/lib/images'
import { classNames } from '@/lib/utils'
import Container from '../container'

interface Props {
    className?: string
}

const Footer: FC<Props> = props => (
    <Container
        as="footer"
        className={classNames(
            'grid gap-6 pb-6 sm:grid-cols-[1fr_auto_1fr]',
            props.className
        )}
    >
        <div className="flex flex-col items-center gap-1 sm:items-start">
            <Image alt="Noctis" height={21} src={logoMinimal} width={132} />
        </div>
        <div className="flex flex-col items-center gap-1 sm:col-3 sm:items-end">
            <span className="text-text-secondary text-xs">Powered by</span>
            <a href="https://penumbra.zone/" target="_blank">
                <Image alt="Penumbra" height="13" src={penumbra} width="134" />
            </a>
        </div>
        <a
            className={classNames(
                'flex items-center justify-center gap-1 text-xs sm:col-1',
                'sm:row-2 sm:justify-start'
            )}
            href="mailto:penumbra@pklabs.me"
            target="_blank"
        >
            <MailIcon size={12} />
            penumbra@pklabs.me
        </a>
        <div
            className={classNames(
                'text-text-secondary text-center text-xs sm:col-1 sm:row-3',
                'sm:text-left'
            )}
        >
            Supported by
            <br />
            <a
                className="text-text-secondary hover:text-text-special"
                href="https://numogrammatics.org/"
                target="_blank"
            >
                IAN
            </a>
            ,{' '}
            <a
                className="text-text-secondary hover:text-text-special"
                href="https://penumbralabs.xyz/"
                target="_blank"
            >
                Penumbra Labs
            </a>
            ,{' '}
            <a
                className="text-text-secondary hover:text-text-special"
                href="https://radiantcommons.com/"
                target="_blank"
            >
                Radiant Commons
            </a>
        </div>
        <div
            className={classNames(
                'text-text-secondary row-3 text-center text-xs sm:col-2',
                'sm:self-end'
            )}
        >
            Built by <br className="sm:hidden" />
            <a
                className="text-text-secondary hover:text-text-special"
                href="https://www.pklabs.me/"
                target="_blank"
            >
                PK Labs
            </a>
        </div>
    </Container>
)

export default Footer
