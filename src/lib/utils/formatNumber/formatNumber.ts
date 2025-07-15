const formatNumber = (number: number, toFixed?: number) => {
    const options: Intl.NumberFormatOptions = {}

    if (typeof toFixed !== 'undefined') {
        options.minimumFractionDigits = toFixed
        options.maximumFractionDigits = toFixed
    }

    return new Intl.NumberFormat('en-US', options).format(number)
}

export default formatNumber
