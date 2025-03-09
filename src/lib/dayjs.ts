// istanbul ignore file
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

// TODO: Implement displaying 1-3wk ago
dayjs.updateLocale('en', {
    relativeTime: {
        d: '1d',
        dd: '%dd',
        future: '0s ago',
        h: '1hr',
        hh: '%dhr',
        m: '1min',
        M: '1m',
        mm: '%dmin',
        MM: '%dm',
        past: '%s ago',
        s: '%ds',
        y: '1y',
        yy: '%dy',
    },
})

export default dayjs
