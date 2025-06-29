import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { ValidatorsQuery } from '@/lib/graphql/generated/types'
import { penumbraImage, placeholderAvatarImage } from '@/lib/images'
import { classNames, formatNumber, shortenHash } from '@/lib/utils'
import { validatorImages } from '@/lib/validators'
import Avatar from '../../avatar'
import EmptyState from '../../emptyState'
import ValidatorStateBonding from '../../validatorStateBonding'
import { Table, TableCell, TableProps, TableRow } from '../table'

export interface Props extends Omit<TableProps, 'children'> {
    inactive?: boolean
    validators: ValidatorsQuery['validatorsHomepage']['validators']
}

const ValidatorTable: FC<Props> = ({ inactive, validators, ...props }) => (
    <Table {...props}>
        <thead>
            <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>
                    {inactive ? 'Staked tokens' : 'Voting power'}
                </TableCell>
                <TableCell header>Uptime %</TableCell>
                <TableCell header>Defined</TableCell>
                <TableCell header>Commission</TableCell>
            </TableRow>
        </thead>
        <tbody>
            {validators.length ? (
                validators.map((validator, i) => (
                    <TableRow key={i} href={`/validator/${validator.id}`}>
                        <TableCell className="h-15">
                            <Avatar
                                alt={validator.name || validator.id}
                                fallback={placeholderAvatarImage}
                                src={validatorImages[validator.id]}
                                fallbackLetter
                            />
                            <Link href={`/validator/${validator.id}`}>
                                {validator.name ||
                                    shortenHash(validator.id, 19, 'end')}
                            </Link>
                        </TableCell>
                        <TableCell className="h-15">
                            <ValidatorStateBonding
                                bondingState={validator.bondingState}
                                state={validator.state}
                            />
                        </TableCell>
                        <TableCell className="h-15">
                            {inactive ? (
                                <span className="inline-flex items-center gap-1">
                                    <Image
                                        alt="UM"
                                        height={24}
                                        src={penumbraImage}
                                        width={24}
                                    />
                                    <span>
                                        {formatNumber(validator.votingPower)} UM
                                    </span>
                                </span>
                            ) : (
                                <span className="inline-flex flex-col gap-1">
                                    <span className="inline-flex items-center gap-1">
                                        <Image
                                            alt="UM"
                                            height={24}
                                            src={penumbraImage}
                                            width={24}
                                        />
                                        <span>
                                            {formatNumber(
                                                validator.votingPower
                                            )}{' '}
                                            UM
                                        </span>
                                    </span>
                                    <span className="text-text-secondary ml-7 text-xs">
                                        {validator.votingPowerActivePercentage.toFixed(
                                            2
                                        )}
                                        %
                                    </span>
                                </span>
                            )}
                        </TableCell>
                        <TableCell className="h-15">
                            {typeof validator.uptime === 'number' ? (
                                <span
                                    className={classNames(
                                        validator.uptime >= 80
                                            ? 'text-success-light'
                                            : validator.uptime > 5
                                              ? 'text-caution-light'
                                              : 'text-destructive-light'
                                    )}
                                >
                                    {validator.uptime.toFixed(2)}%
                                </span>
                            ) : null}
                        </TableCell>
                        <TableCell className="h-15">
                            {validator.firstSeenTime}
                        </TableCell>
                        <TableCell className="h-15">
                            {validator.commission}%
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell className="h-15" colSpan={6}>
                        <EmptyState>No validators found</EmptyState>
                    </TableCell>
                </TableRow>
            )}
        </tbody>
    </Table>
)

export default ValidatorTable
