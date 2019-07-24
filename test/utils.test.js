const helper = require('../utils.js');

const SECONDS_IN_DAY = 86400;

contract('Test Utils', async () =>  {

    it("Test advanceTime", async() => {
        //capture before time
       
        /*
        const currentBlock = await web3.eth.getBlock()
        console.log(currentBlock)

        const output = await helper.advanceTime(SECONDS_IN_DAY);
        console.log(output)
        await web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0})
        
        const advancedBlock = await web3.eth.getBlock(currentBlock.number)
        console.log(advancedBlock)
        assert.isBelow(currentBlock.timestamp, advancedBlock.timestamp, "Time was not advanced")
        */

        //await helper.advanceTime(SECONDS_IN_DAY)
        //capture after time
        //assert after time is later than before time by number of seconds
        // await helper.advanceTime(SECONDS_IN_DAY)
    })

    it("Test advanceBlock", async() => {
        const currentBlock = await web3.eth.getBlock('latest')
        const currentBlockNum = currentBlock.number

        await helper.advanceBlock()
        
        const advancedBlock = await web3.eth.getBlock('latest')
        const advanceBlockNum = advancedBlock.number
        
        assert.equal(currentBlockNum + 1, advanceBlockNum, "New block was not mined")
    })

    it("Test advanceTimeAndBlock", async() => {
        //capture before time
        //await helper.advanceTimeAndBlock(SECONDS_IN_DAY)
        //capture after time
        //assert after time is later than before time by number of seconds
    })

    it("Test takeSnapShot", async() => {
        const snapShot = await helper.takeSnapshot();
        const snapShotId = snapShot['result']
        
        assert.exists(snapShotId, "Unable to produce snapshot")
    })

    it("Test revertToSnapShot", async() => {
        //id = await helper.takeSnapshot()
        //move time forward
        //assert time moved
        //await helper.revertToSnapshot(id)
        //assert time reverted
    })
});
