import { buffer, interval, map, pipe, Source } from 'wonka'

const throttleStream = <T = any>(
    source: Source<T>,
    wait: number,
    take: number
) =>
    pipe(
        source,
        buffer(interval(wait)),
        map(items => items.slice(-take))
    )

export default throttleStream
