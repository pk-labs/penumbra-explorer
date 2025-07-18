import { UmPriceData } from '@/lib/types'

const searchParams = new URLSearchParams({
    ids: 'penumbra',
    vs_currency: 'usd',
})

const url = `https://api.coingecko.com/api/v3/coins/markets?${searchParams}`

interface Data {
    current_price: null | number
    price_change_percentage_24h: null | number
}

const getUmPrice = async (): Promise<UmPriceData | undefined> => {
    try {
        const response: Data[] = await fetch(url).then(res => res.json())

        if (!response.length) {
            return
        }

        const [data] = response

        return {
            change: data.price_change_percentage_24h,
            price: data.current_price,
        }
    } catch (e) {
        console.error(e)
    }
}

export default getUmPrice
