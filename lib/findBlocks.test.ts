// noinspection JSCheckFunctionSignatures

import {IDepthHistory} from "./IDepthHistory";
import {BlockFinder} from "./blockFinder";

const contractDepthHistory: IDepthHistory[] = [
    {
        contract: 'PH220604-05',
        deliveryStart: '2022-06-04 05:00',
        deliveryEnd: '2022-06-04 06:00',
        tradeOpen: '2022-06-03 18:00',
        tradeClose: '2022-06-04 03:00',
        dateTime: '2022-06-03 19:02',
        buy: [
            {
                price: 1000,
                quantity: 4.5
            }
        ],
        sell: [
            {
                price: 4476,
                quantity: 3.7
            }, {
                price: 4858,
                quantity: 4
            }
        ]
    },
    {
        contract: 'PH220604-05',
        deliveryStart: '2022-06-04 05:00',
        deliveryEnd: '2022-06-04 06:00',
        tradeOpen: '2022-06-03 18:00',
        tradeClose: '2022-06-04 03:00',
        dateTime: '2022-06-03 19:05',
        buy: [
            {
                price: 1465,
                quantity: 4.5
            },
            {
                price: 1000,
                quantity: 4
            }
        ],
        sell: [
            {
                price: 4476,
                quantity: 3.7
            }, {
                price: 4556,
                quantity: 4
            }, {
                price: 4858,
                quantity: 7
            }
        ]
    }
];

it('should parse sample blocks', function () {

    const expectedResult1 = [
        {
            contract: 'PH220604-05',
            dateTime: '2022-06-03 19:02',
            remainingMinutes: 478,
            buyBlocks: [
                1000.00,
                1000.00
            ],
            sellBlocks: [
                4476.00,
                4674.64,
                4858.00,
                4858.00
            ]
        }
    ];

    const calculatedResult = BlockFinder.findBlocks(contractDepthHistory[0]);

    expect(calculatedResult).not.toBeNull();
    //expect(Array.isArray(calculatedResult)).toBe(true);
    //expect(calculatedResult.length).toBe(1);

    expect(calculatedResult.contract).toBe(expectedResult1[0].contract);
    expect(calculatedResult.dateTime).toBe(expectedResult1[0].dateTime);
    expect(calculatedResult.remainingMinutes).toBe(expectedResult1[0].remainingMinutes);

    expect(Array.isArray(calculatedResult.buyBlocks)).toBe(true);
    expect(calculatedResult.buyBlocks.length).toBe(expectedResult1[0].buyBlocks.length);

    calculatedResult.buyBlocks.forEach((_, index) => {
        expect(calculatedResult.buyBlocks[index]).toBe(expectedResult1[0].buyBlocks[index]);
    });

    expect(Array.isArray(calculatedResult.sellBlocks)).toBe(true);
    expect(calculatedResult.sellBlocks.length).toBe(expectedResult1[0].sellBlocks.length);

    calculatedResult.sellBlocks.forEach((_, index) => {
        expect(calculatedResult.sellBlocks[index]).toBe(expectedResult1[0].sellBlocks[index]);
    });
});