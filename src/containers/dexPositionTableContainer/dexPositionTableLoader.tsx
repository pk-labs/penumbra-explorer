// istanbul ignore file
import { faker } from '@faker-js/faker'
import { ExternalLinkIcon } from 'lucide-react'
import { FC } from 'react'
import {
    DexPositionStatePill,
    EmptyState,
    Table,
    TableCell,
    TableRow,
    TimeAgo,
} from '@/components'
import dayjs from '@/lib/dayjs'
import { DexPositionState, TransformedDexPosition } from '@/lib/types'
import { classNames, formatNumber, shortenHash } from '@/lib/utils'
import { Props } from './dexPositionTableContainer'

const currencies = ['ATOM', 'CDT', 'OSMO', 'TIA', 'UM', 'USDC']

const DexPositionTableLoader: FC<Props> = async props => {
    const positions = await new Promise<TransformedDexPosition[]>(resolve =>
        setTimeout(
            () =>
                resolve(
                    Array.from({ length: props.limit.length })
                        .map(() => {
                            const base = faker.helpers.arrayElement(currencies)

                            const quote = faker.helpers.arrayElement(
                                currencies.filter(currency => currency != base)
                            )

                            return {
                                base,
                                fee: faker.number.float({ max: 0.9, min: 0.1 }),
                                id: faker.finance.bitcoinAddress(),
                                quote,
                                reserve: faker.number.float({
                                    max: 5000,
                                    min: 0.001,
                                }),
                                state: faker.helpers.arrayElement(
                                    Object.values(DexPositionState)
                                ),
                                timestamp: dayjs()
                                    .add(
                                        faker.number.int({ max: 0, min: -500 }),
                                        'seconds'
                                    )
                                    .valueOf(),
                            }
                        })
                        .toSorted((a, b) => b.timestamp - a.timestamp)
                ),
            faker.number.int({ max: 1000, min: 500 })
        )
    )

    return (
        <Table className={props.className} header={props.header}>
            <thead>
                <TableRow>
                    <TableCell header>Pair</TableCell>
                    <TableCell header>Reserves</TableCell>
                    <TableCell header>State</TableCell>
                    <TableCell header>Fee tier</TableCell>
                    <TableCell header>Updated</TableCell>
                    <TableCell header>Position ID</TableCell>
                </TableRow>
            </thead>
            <tbody>
                {positions?.length ? (
                    positions.map(position => (
                        <TableRow key={position.id}>
                            <TableCell className="h-20">
                                {position.base}/{position.quote}
                            </TableCell>
                            <TableCell className="h-20">
                                {formatNumber(position.reserve)}{' '}
                                {position.quote}
                            </TableCell>
                            <TableCell className="h-20">
                                <DexPositionStatePill state={position.state} />
                            </TableCell>
                            <TableCell className="h-20">
                                {position.fee.toFixed(2)}%
                            </TableCell>
                            <TableCell className="h-20">
                                <TimeAgo timestamp={position.timestamp} />
                            </TableCell>
                            <TableCell className="h-20">
                                <a
                                    className={classNames(
                                        'hover:text-text-special inline-flex',
                                        'items-center gap-1'
                                    )}
                                    href={`https://dex.penumbra.zone/inspect/lp/${position.id}`}
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    {shortenHash(position.id, 9, 'end')}
                                    <ExternalLinkIcon size={16} />
                                </a>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="h-20" colSpan={6}>
                            <EmptyState>No positions found</EmptyState>
                        </TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default DexPositionTableLoader
