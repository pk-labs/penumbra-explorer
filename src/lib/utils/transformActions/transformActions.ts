/* istanbul ignore file */
const transformActions = (actions: Array<Record<string, any>>) => {
    return actions.map(action => Object.keys(action)[0])
}

export default transformActions
