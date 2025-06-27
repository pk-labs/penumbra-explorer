const shortenHash = (
    hash: string,
    length: number,
    truncate: 'end' | 'middle' = 'middle'
) => {
    if (truncate === 'middle') {
        const halfLength = Math.floor(length / 2)

        return hash.length <= length
            ? hash
            : `${hash.slice(0, halfLength)}...${hash.slice(-halfLength)}`
    }

    return hash.length <= length ? hash : `${hash.slice(0, length)}...`
}

export default shortenHash
