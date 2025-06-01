const firstLetter = (string: string) => {
    for (let i = 0; i < string.length; i++) {
        const char = string[i]

        if (/\p{L}/u.test(char)) {
            return char
        }
    }

    return ''
}

export default firstLetter
