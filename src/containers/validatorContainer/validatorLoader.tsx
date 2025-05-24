// istanbul ignore file
import { faker } from '@faker-js/faker'
import { FC } from 'react'
import { CopyToClipboard, Parameter, Parameters } from '@/components'
import { classNames, formatNumber } from '@/lib/utils'
import ValidatorStatusBonding from '../../components/validatorStatusBonding'

export interface Props {
    className?: string
    validator: string
}

const ValidatorLoader: FC<Props> = async props => {
    const validator = await new Promise<any>(resolve =>
        setTimeout(
            () => {
                const uptime = faker.datatype.boolean()
                    ? 100
                    : faker.number.float({
                          max: 100,
                          min: 0,
                      })

                const uptimeBlocksWindow = 10000
                const signed = Math.round((uptime / 100) * uptimeBlocksWindow)

                resolve({
                    bonding: faker.helpers.arrayElement([
                        'Bonded',
                        'Unbonding',
                        'Unbonded',
                    ]),
                    description: faker.lorem.paragraph(5),
                    hash: props.validator,
                    missed: uptimeBlocksWindow - signed,
                    signed,
                    status: faker.helpers.arrayElement([
                        'Active',
                        'Defined',
                        'Disabled',
                        'Inactive',
                        'Jailed',
                        'Tombstoned',
                        'Unspecified',
                    ]),
                    uptime,
                    uptimeBlocksWindow,
                })
            },
            faker.number.int({ max: 2000, min: 1000 })
        )
    )

    return (
        <section
            className={classNames(
                'bg-other-tonalFill5 flex flex-col gap-6 rounded-lg p-6',
                'backdrop-blur-lg',
                props.className
            )}
        >
            <header className="flex items-center gap-4">
                <span className="flex items-center gap-2 overflow-hidden">
                    <img
                        alt={validator.hash}
                        className="rounded-full"
                        height={40}
                        src="https://image-cdn.solana.fm/images/?imageUrl=https://bafkreihcgrvcp4ze7jjcgblux56idqnqbapmnqm2yc7ky5j6fpaonqtbdu.ipfs.nftstorage.link"
                        width={40}
                    />
                    <h1 className="truncate text-2xl">{validator.hash}</h1>
                </span>
                <ValidatorStatusBonding
                    bonding={validator.bonding}
                    className="text-right"
                    status={validator.status}
                />
            </header>
            <p className="text-text-secondary text-sm">
                {validator.description}
            </p>
            <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-1 text-base font-medium">
                    ID <CopyToClipboard text={validator.hash} small />
                </h3>
                <div
                    className={classNames(
                        'text-text-secondary bg-other-tonalFill5 rounded-sm',
                        'p-4 font-mono text-sm font-medium break-all'
                    )}
                >
                    {validator.hash}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium">
                    Total uptime{' '}
                    <span
                        className={classNames(
                            validator.uptime === 100
                                ? 'text-success-light'
                                : validator.uptime > 5
                                  ? 'text-caution-light'
                                  : 'text-destructive-light'
                        )}
                    >
                        {validator.uptime.toFixed(2)}%
                    </span>
                </h3>
                <Parameters>
                    <Parameter name="Uptime blocks window">
                        {formatNumber(validator.uptimeBlocksWindow)}
                    </Parameter>
                    <Parameter name="Signed">
                        {formatNumber(validator.signed)}
                    </Parameter>
                    <Parameter name="Missed">
                        {formatNumber(validator.missed)}
                    </Parameter>
                </Parameters>
            </div>
        </section>
    )
}

export default ValidatorLoader
