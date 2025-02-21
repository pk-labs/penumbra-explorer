const formatAction = (action: string) =>
    action
        .replaceAll(/([A-Z])/g, ' $1')
        .trimStart()
        .toLowerCase()

export default formatAction
