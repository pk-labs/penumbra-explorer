const ucFirst = (string?: string) =>
    string
        ? string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
        : ''

export default ucFirst
