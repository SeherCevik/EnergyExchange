import {IOfferInfo} from "./IDepthHistory";

export function calcWeightedAverage(parts: IOfferInfo[]): number {
    const result = parts.reduce((acc, part) => {

        acc.price += part.price * part.quantity;
        acc.quantity += part.quantity;

        return acc;

    }, {
        price: 0,
        quantity: 0
    });

    return result.price / result.quantity;
}