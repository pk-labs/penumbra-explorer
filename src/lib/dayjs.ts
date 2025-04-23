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

dayjs.updateLocale('en', {
    relativeTime: {
        d: '1d',
        dd: (days: number) =>
            days >= 7 ? `${Math.round(days / 7)}wk` : `${days}d`,
        future: '0s ago',
        h: '1hr',
        hh: '%dhr',
        m: '1min',
        M: '1mo',
        mm: '%dmin',
        MM: '%dmo',
        past: '%s ago',
        s: '%ds',
        w: '1w',
        ww: '%dw',
        y: '1yr',
        yy: '%dyr',
    },
})

export default dayjs
