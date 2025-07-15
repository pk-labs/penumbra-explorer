import { blockSeconds } from '@/lib/constants'
import dayjs from '@/lib/dayjs'

const blocksDuration = (blocks: number, format: 'long' | 'short' = 'short') => {
    const duration = dayjs.duration(blocks * blockSeconds * 1000)

    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()

    if (format === 'short') {
        if (days >= 1) {
            return `~${days}d`
        } else if (hours >= 1) {
            return `~${hours}hr`
        } else if (minutes >= 1) {
            return `~${minutes}m`
        } else {
            return `~${seconds}s`
        }
    } else {
        if (days >= 1) {
            return (
                `~${days} day${days !== 1 ? 's' : ''} ` +
                `${hours} hour${hours !== 1 ? 's' : ''}`
            )
        } else if (hours >= 1) {
            return (
                `~${hours} hour${hours !== 1 ? 's' : ''} ` +
                `${minutes} minute${minutes !== 1 ? 's' : ''}`
            )
        } else if (minutes >= 1) {
            return (
                `~${minutes} minute${minutes !== 1 ? 's' : ''} ` +
                `${seconds} second${seconds !== 1 ? 's' : ''}`
            )
        } else {
            return `~${seconds} second${seconds !== 1 ? 's' : ''}`
        }
    }
}

export default blocksDuration
