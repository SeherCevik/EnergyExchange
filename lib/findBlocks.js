function findBlocks(contractDepthHistory) {
    //TODO: sehere bunu yapçak etçek
    // let contract = contractDepthHistory[0].contract;
    // let dateTime=contractDepthHistory[0].dateTime;
    let remainingMinutes= Date.parse(contractDepthHistory[0].tradeClose) - Date.parse(contractDepthHistory[0].dateTime);
    let min = Math.floor((remainingMinutes/1000/60) << 0);

    let a = ((contractDepthHistory[0].sell[0].price)*2.5)/2.5
    let b =(((contractDepthHistory[0].sell[0].quantity-2.5)*contractDepthHistory[0].sell[0].price)+(contractDepthHistory[0].sell[1].price*1.3))/2.5
    let c = ((2.5*contractDepthHistory[0].sell[1].price)/2.5);
    // let sell250=[a , b , c];

    const expectedResult1 =
    {
        contract :contractDepthHistory[0].contract,
        dateTime:contractDepthHistory[0].dateTime,
        min : Math.floor((remainingMinutes/1000/60) << 0),
        sell250 : [a.toFixed(2) , b.toFixed(2) , c.toFixed(2)]
    }

    
    return JSON.stringify({expectedResult1}, null , " ");
    //return [];
}


module.exports = findBlocks;