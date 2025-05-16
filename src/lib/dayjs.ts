// istanbul ignore file
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

dayjs.extend(relativeTime, {
    thresholds: [
        // 1s - 59s
        { d: 'second', l: 's', r: 59 },
        // 1min: 60s - 119s
        { d: 'second', l: 'm', r: 119 },
        // 2min - 59min
        { d: 'minute', l: 'mm', r: 59 },
        // 1hr: 60min - 119min
        { d: 'minute', l: 'h', r: 119 },
        // 2hr - 23hr
        { d: 'hour', l: 'hh', r: 23 },
        // 1d: 24hr - 47hr
        { d: 'hour', l: 'd', r: 47 },
        // 2d - 29d
        { d: 'day', l: 'dd', r: 29 },
        // 1mo: 30d - 59d
        { d: 'day', l: 'M', r: 59 },
        // 2mo - 11mo
        { d: 'month', l: 'MM', r: 11 },
        // 1yr: 12mo - 23mo
        { d: 'month', l: 'y', r: 23 },
        // 2+yr
        { d: 'year', l: 'yy' },
    ],
})

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
