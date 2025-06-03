// istanbul ignore file
import { ExternalLinkIcon, InfoIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Avatar,
    CopyToClipboard,
    Parameter,
    Parameters,
    ValidatorStatusBonding,
} from '@/components'
import { getValidator } from '@/lib/data'
import { placeholderAvatarImage } from '@/lib/images'
import { classNames, formatNumber, shortenHash } from '@/lib/utils'
import { validatorImages } from '@/lib/validators'
import { Props } from './validatorContainer'

const ValidatorLoader: FC<Props> = async props => {
    const validator = await getValidator(props.validatorId)

    if (!validator) {
        notFound()
    }

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <header className="flex justify-between gap-4">
                <span className="flex gap-2">
                    <Avatar
                        alt={validator.name || validator.id}
                        className="h-10 w-10 shrink-0 text-base"
                        fallback={placeholderAvatarImage}
                        src={validatorImages[validator.id]}
                        fallbackLetter
                    />
                    <span className="inline-flex flex-col gap-1">
                        <h1 className="text-2xl">
                            {validator.name || validator.id}
                        </h1>
                        {validator.website && (
                            <a
                                className={classNames(
                                    'text-text-secondary',
                                    'hover:text-text-special inline-flex',
                                    'items-center gap-2 text-xs'
                                )}
                                href={validator.website}
                                target="_blank"
                            >
                                {validator.website}
                                <ExternalLinkIcon size={14} />
                            </a>
                        )}
                    </span>
                </span>
                <ValidatorStatusBonding
                    bonding={validator.bonding}
                    className="text-right"
                    status={validator.status}
                />
            </header>
            {validator.description && (
                <p className="text-text-secondary text-sm">
                    {validator.description}
                </p>
            )}
            <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-1 text-base font-medium">
                    ID <CopyToClipboard text={validator.id} small />
                </h3>
                <div
                    className={classNames(
                        'text-text-secondary bg-other-tonalFill5 rounded-sm',
                        'p-4 font-mono text-sm font-medium break-all'
                    )}
                >
                    {validator.id}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {typeof validator.totalUptime === 'number' ? (
                    <h3 className="text-base font-medium">
                        Total uptime{' '}
                        <span
                            className={classNames(
                                validator.totalUptime >= 80
                                    ? 'text-success-light'
                                    : validator.totalUptime > 5
                                      ? 'text-caution-light'
                                      : 'text-destructive-light'
                            )}
                        >
                            {validator.totalUptime.toFixed(2)}%
                        </span>
                    </h3>
                ) : null}
                <Parameters>
                    <Parameter name="Uptime blocks window">
                        {formatNumber(validator.uptimeBlockWindow)}
                    </Parameter>
                    <Parameter name="Signed">
                        {formatNumber(validator.signedBlocks)}
                    </Parameter>
                    <Parameter name="Missed">
                        {formatNumber(validator.missedBlocks)}
                    </Parameter>
                </Parameters>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium">
                    Commission {validator.commissionPercentage.toFixed(2)}%
                </h3>
                {validator.commissionStreams?.length && (
                    <Parameters>
                        {validator.commissionStreams.map((stream, i) => (
                            <Parameter
                                key={i}
                                name={`${(stream.rateBps / 100).toFixed(2)}% to`}
                            >
                                {stream.recipientAddress ? (
                                    <>
                                        {shortenHash(
                                            stream.recipientAddress,
                                            'end'
                                        )}
                                        <CopyToClipboard
                                            className="text-text-primary"
                                            text={stream.recipientAddress}
                                            small
                                        />
                                    </>
                                ) : (
                                    'Unknown'
                                )}
                            </Parameter>
                        ))}
                    </Parameters>
                )}
            </div>
            <footer className="text-text-secondary flex gap-1 text-xs">
                <InfoIcon className="-mt-1" />
                <span>
                    To report inaccurate information or update a logo, email us
                    at{' '}
                    <a href="mailto:penumbra@pklabs.me" target="_blank">
                        penumbra@pklabs.me
                    </a>
                    .
                </span>
            </footer>
        </section>
    )
}

export default ValidatorLoader
