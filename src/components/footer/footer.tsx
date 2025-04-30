import { MailIcon } from 'lucide-react'
import { FC } from 'react'
import { classNames } from '@/lib/utils'
import Container from '../container'
import { Discord, GitHub, LogoMinimal, Penumbra, Twitter } from '../vectors'

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
        <div className="flex flex-col items-center gap-2 sm:items-start">
            <LogoMinimal />
            <div className="flex gap-2">
                <a
                    className={classNames(
                        'border-other-tonalStroke inline-flex h-8 w-8',
                        'items-center justify-center rounded-full border-1'
                    )}
                    href="https://github.com/penumbra-zone"
                    target="_blank"
                >
                    <Discord />
                </a>
                <a
                    className={classNames(
                        'border-other-tonalStroke inline-flex h-8 w-8',
                        'items-center justify-center rounded-full border-1'
                    )}
                    href="https://github.com/pk-labs/penumbra-explorer"
                    target="_blank"
                >
                    <GitHub />
                </a>
                <a
                    className={classNames(
                        'border-other-tonalStroke inline-flex h-8 w-8',
                        'items-center justify-center rounded-full border-1'
                    )}
                    href="https://twitter.com/penumbrazone"
                    target="_blank"
                >
                    <Twitter />
                </a>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1 sm:col-3 sm:items-end">
            <span className="text-text-secondary text-xs">Powered by</span>
            <a href="https://penumbra.zone/" target="_blank">
                <Penumbra />
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
                'text-text-secondary text-center text-xs sm:col-2 sm:row-3',
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
