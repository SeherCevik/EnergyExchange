import {IOfferInfo} from "./IDepthHistory";

export interface IFoundBlocks {
    contract: string,
    dateTime: string,
    remainingMinutes: number,
    buyBlocks: number[],
    sellBlocks: number[]
}
