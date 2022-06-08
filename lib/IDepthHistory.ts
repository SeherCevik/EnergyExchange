export interface IOfferInfo {
    price: number,
    quantity: number
}

export interface IDepthHistory {
    contract: string,
    deliveryStart: string,
    deliveryEnd: string,
    tradeOpen: string,
    tradeClose: string,
    dateTime: string,

    buy: IOfferInfo[],
    sell: IOfferInfo[]
}