import {IDepthHistory} from "./IDepthHistory";
import {BlockFinder} from "./blockFinder";
const {calcWeightedAverage}  = require ('./WeightAverage');



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

        const expectedResult = [
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


    /*const calcWeightedAverageResult = calcWeightedAverage(contractDepthHistory[0].buy);*/
    const calcWeightedAverageResult1= calcWeightedAverage(contractDepthHistory[0]);


   /* expect(calcWeightedAverageResult).not.toBeNull();*/
    expect(calcWeightedAverageResult1.price).toBe(expectedResult[0].buyBlocks);
    expect(expectedResult).not.toBeNull();


    expect(calcWeightedAverageResult1).toBe(1001);
    expect(calcWeightedAverageResult1).toBe(4475);




});






