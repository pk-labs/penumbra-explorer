import { secondsPerBlock } from '@/lib/constants'

const blocksToTime = (blocks: number) => {
    const seconds = blocks * secondsPerBlock
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    if (days >= 1) {
        return `~${Math.floor(days)} days`
    } else if (hours >= 1) {
        return `~${Math.floor(hours)} hours`
    } else if (minutes >= 1) {
        return `~${Math.floor(minutes)} minutes`
    } else {
        return `~${seconds} seconds`
    }
}

export default blocksToTime
