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
                    href="http://discord.gg/penumbrazone"
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
        <div
            className={classNames(
                'text-text-secondary text-center text-xs sm:col-3 sm:row-2',
                'sm:text-right'
            )}
        >
            Supported by
            <br />
            <a href="https://numogrammatics.org/" target="_blank">
                IAN
            </a>
            ,{' '}
            <a href="https://penumbralabs.xyz/" target="_blank">
                Penumbra Labs
            </a>
            ,{' '}
            <a href="https://radiantcommons.com/" target="_blank">
                Radiant Commons
            </a>
        </div>
        <div
            className={classNames(
                'text-text-secondary text-center text-xs sm:col-1 sm:row-2',
                'sm:self-end sm:text-left'
            )}
        >
            Built by{' '}
            <a
                className="text-text-secondary hover:text-text-special"
                href="https://www.pklabs.me/"
                target="_blank"
            >
                PK Labs
            </a>
            <br />
            <MailIcon
                className="text-text-primary inline align-middle"
                size={12}
            />{' '}
            <a href="mailto:penumbra@pklabs.me" target="_blank">
                penumbra@pklabs.me
            </a>
        </div>
    </Container>
)

export default Footer
