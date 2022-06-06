// noinspection JSCheckFunctionSignatures

const findBlocks = require("./findBlocks");

const contractDepthHistory = [
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
            remainingMinutes: 477,
            buy250: [
                1000.00,
                1000.00
            ],
            sell250: [
                4476.00,
                4674.64,
                4858.00,
                4858.00
            ]
        }
    ];

    const calculatedResult1 = findBlocks(contractDepthHistory[0]);

    expect(calculatedResult1, "Result is null").not.toBeNull();
    expect(Array.isArray(calculatedResult1), "Result is not an array").toBe(true);
    expect(calculatedResult1.length, "Expected one row").toBe(1);

    expect(calculatedResult1[0].contract).toBe(expectedResult1[0].contract);
    expect(calculatedResult1[0].dateTime).toBe(expectedResult1[0].dateTime);
    expect(calculatedResult1[0].remainingMinutes).toBe(expectedResult1[0].remainingMinutes);

    expect(Array.isArray(calculatedResult1[0].buy250)).toBe(true);
    expect(calculatedResult1[0].buy250.length).toBe(expectedResult1[0].buy250.length);

    calculatedResult1[0].buy250.forEach((_, index) => {
        expect(calculatedResult1[0].buy250[index], "buy250[" + index + "] does not match").toBe(expectedResult1[0].buy250[index]);
    });

    expect(calculatedResult1[0].sell250).toBe(true);
    expect(calculatedResult1[0].sell250.length).toBe(expectedResult1[0].sell250.length);

    calculatedResult1[0].sell250.forEach((_, index) => {
        expect(calculatedResult1[0].sell250[index], "sell250[" + index + "] does not match").toBe(expectedResult1[0].sell250[index]);
    });
});