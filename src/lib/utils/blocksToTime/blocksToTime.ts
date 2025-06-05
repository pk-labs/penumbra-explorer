import { secondsPerBlock } from '@/lib/constants'

const blocksToTime = (blocks: number) => {
    const seconds = blocks * secondsPerBlock
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    if (days >= 1) {
        return `~${Math.floor(days)}d`
    } else if (hours >= 1) {
        return `~${Math.floor(hours)}hr`
    } else if (minutes >= 1) {
        return `~${Math.floor(minutes)}m`
    } else {
        return `~${seconds}s`
    }
}

export default blocksToTime
