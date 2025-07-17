// istanbul ignore file
import { ExternalLinkIcon, InfoIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Avatar,
    CopyToClipboard,
    Parameter,
    Parameters,
    Surface,
    ValidatorStateBonding,
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
        <Surface
            as="section"
            className={classNames('flex flex-col gap-6 p-6', props.className)}
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
                        <h1 className="text-2xl break-all">
                            {validator.name ||
                                shortenHash(validator.id, 19, 'end')}
                        </h1>
                        {validator.website && (
                            <a
                                className={classNames(
                                    'text-text-secondary',
                                    'hover:text-text-special text-xs break-all'
                                )}
                                href={validator.website}
                                rel="nofollow"
                                target="_blank"
                            >
                                {validator.website}
                                <ExternalLinkIcon
                                    className="-mt-1 ml-2 inline-block"
                                    size={14}
                                />
                            </a>
                        )}
                    </span>
                </span>
                <ValidatorStateBonding
                    bondingState={validator.bondingState}
                    className="text-right"
                    state={validator.state}
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
                                        <span className="text-text-primary">
                                            {shortenHash(
                                                stream.recipientAddress,
                                                19,
                                                'end'
                                            )}
                                        </span>
                                        <CopyToClipboard
                                            className="text-text-primary"
                                            text={stream.recipientAddress}
                                            small
                                        />
                                    </>
                                ) : (
                                    'Community pool'
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
        </Surface>
    )
}

export default ValidatorLoader
