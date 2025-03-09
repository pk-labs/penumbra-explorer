import { UmPrice } from '@/lib/types'

const searchParams = new URLSearchParams({
    baseAsset: 'UM',
    durationWindow: '1d',
    quoteAsset: 'USDC',
})

const url = `https://dex.penumbra.zone/api/summary?${searchParams.toString()}`

interface Data {
    change: {
        percent: string
        sign: 'negative' | 'positive'
    }
    price: string
}

const getUmPrice = async (): Promise<UmPrice | undefined> => {
    try {
        const data: Data = await fetch(url).then(res => res.json())

        return {
            change:
                data.change.sign === 'negative'
                    ? -1 * Number(data.change.percent)
                    : Number(data.change.percent),
            price: Number(data.price),
        }
    } catch (e) {
        console.error(e)
    }
}

export default getUmPrice
