import { ActionType } from '@/lib/types'

const formatAction = (action: ActionType) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const key = Object.keys(ActionType).find(key => ActionType[key] === action)

    return key
        ?.replaceAll(/([A-Z])/g, ' $1')
        .trimStart()
        .toLowerCase()
}

export default formatAction
