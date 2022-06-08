import moment = require("moment");
import {IDepthHistory, IOfferInfo} from "./IDepthHistory";
import {IFoundBlocks} from "./IFoundBlocks";
import {calcWeightedAverage} from "./WeightAverage";



export class BlockFinder {

    public static findBlocks(contractDepthHistory: IDepthHistory): IFoundBlocks {

        const buyBlocks = BlockFinder.findBlocksInternal(contractDepthHistory.buy);
        const sellBlocks = BlockFinder.findBlocksInternal(contractDepthHistory.sell);

        const tradeClose = moment(contractDepthHistory.tradeClose);
        const snapshotDate = moment(contractDepthHistory.dateTime);

        const remainingMinutes = tradeClose.diff(snapshotDate, "minutes")

        return {
            contract: contractDepthHistory.contract,
            dateTime: contractDepthHistory.dateTime,
            remainingMinutes: remainingMinutes,
            buyBlocks: buyBlocks,
            sellBlocks: sellBlocks
        };
    }

    private static findBlocksInternal(sourceOffers: IOfferInfo[], requestedBlockSize: number = 2.5): number[] {

        let sourceItemIndex = -1;
        let sourceItemRemainingQuantity = 0;
        let sourceItem: IOfferInfo;

        let currentPriceQuantities: IOfferInfo[] = [];
        let currentQuantity: number = 0;

        const resultPrices: number[] = [];

        for(;;) {

            // move to the next source if necessary
            if (sourceItemRemainingQuantity == 0) {
                sourceItemIndex++;

                if (sourceItemIndex >= sourceOffers.length)
                    break;

                sourceItem = sourceOffers[sourceItemIndex];
                sourceItemRemainingQuantity = sourceItem.quantity;
            }

            // get what is available from source
            if (currentQuantity < requestedBlockSize) {
                const neededQuantity = requestedBlockSize - currentQuantity;

                const quantity = Math.min(neededQuantity, sourceItemRemainingQuantity);

                currentPriceQuantities.push({
                    quantity: quantity,
                    price: sourceItem.price
                });

                sourceItemRemainingQuantity -= quantity;
                currentQuantity += quantity;
            }
            else {
                // we have what we need, so add it to the price list
                const avgPrice = calcWeightedAverage(currentPriceQuantities);

                resultPrices.push(avgPrice);
                currentQuantity = 0;
                currentPriceQuantities = [];
            }
        }

        // the one who got away. not on my watch!
        if (currentPriceQuantities.length > 0) {
            const avgPrice = calcWeightedAverage(currentPriceQuantities);

            resultPrices.push(avgPrice);
        }

        return resultPrices;
    }

}





