const shortenHash = (hash: string, truncate: 'end' | 'middle' = 'middle') => {
    if (truncate === 'middle') {
        return hash.length < 19
            ? hash
            : `${hash.slice(0, 8)}...${hash.slice(-8)}`
    }

    return hash.length < 22 ? hash : `${hash.slice(0, 19)}...`
}

export default shortenHash
