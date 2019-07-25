const helper = require('../utils.js')

const SECONDS_IN_DAY = 86400

contract('Test Utils', async () =>  {

    it("Test advanceTime", async() => {
        const currentBlock = await web3.eth.getBlock('latest')

        await helper.advanceTime(SECONDS_IN_DAY);
        await helper.advanceBlock()
        
        const advancedBlock = await web3.eth.getBlock('latest')
        assert.isBelow(currentBlock.timestamp, advancedBlock.timestamp, "Time was not advanced")
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
        const snapShot = await helper.takeSnapshot()
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
