import { UmPriceData } from '@/lib/types'

const searchParams = new URLSearchParams({
    community_data: 'false',
    developer_data: 'false',
    localization: 'false',
    sparkline: 'false',
    tickers: 'false',
})

const url = `https://api.coingecko.com/api/v3/coins/penumbra?${searchParams}`

interface Data {
    market_data: {
        current_price: {
            usd: number
        }
        price_change_percentage_24h: number
    }
}

const getUmPrice = async (): Promise<UmPriceData | undefined> => {
    try {
        const data: Data = await fetch(url).then(res => res.json())
        console.log(data)

        return {
            change: data.market_data.price_change_percentage_24h,
            price: data.market_data.current_price.usd,
        }
    } catch (e) {
        console.error(e)
    }
}

export default getUmPrice
