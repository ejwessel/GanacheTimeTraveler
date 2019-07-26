const helper = require('../utils.js')

const SECONDS_IN_DAY = 86400

contract('Test Utils', async () =>  {
    it("Test advanceBlock", async() => {
        //grab block before advancing blocks 
        const blockBefore = await web3.eth.getBlock('latest')
        const blockBeforeNum = blockBefore.number

        await helper.advanceBlock()
        
        //grab block after advancing blocks 
        const blockAfter = await web3.eth.getBlock('latest')
        const advanceBlockNum = blockAfter.number
        
        assert.equal(blockBeforeNum + 1, advanceBlockNum, "New block was not mined")
    })

    it("Test advanceTime", async() => {
        const blockBefore = await web3.eth.getBlock('latest')

        await helper.advanceTime(SECONDS_IN_DAY);
        //time doesn't update unless block is mined
        await helper.advanceBlock()
        
        const blockAfter = await web3.eth.getBlock('latest')
        assert.isBelow(blockBefore.timestamp, blockAfter.timestamp, "Time was not advanced")
    })

    it("Test advanceTimeAndBlock", async() => {
        const blockBefore = await web3.eth.getBlock('latest')

        await helper.advanceTimeAndBlock(SECONDS_IN_DAY)

        const blockAfter = await web3.eth.getBlock('latest')
        assert.isBelow(blockBefore.timestamp, blockAfter.timestamp, "Time and Block was not advanced")
    })

    it("Test takeSnapshot", async() => {
        const snapshot = await helper.takeSnapshot()
        const snapshotId = snapshot.result

        assert.exists(snapshotId, "Unable to produce snapshot")
    })

    it("Test revertToSnapShot", async() => {
        // grab block before advancing time
        const snapshot = await helper.takeSnapshot()
        const snapshotId = snapshot.result
        const blockBefore = await web3.eth.getBlock('latest')

        // advance time forward
        await helper.advanceTimeAndBlock(SECONDS_IN_DAY)
        const blockAfter = await web3.eth.getBlock('latest')
        assert.isBelow(blockBefore.timestamp, blockAfter.timestamp, "Time did not advance")

        await helper.revertToSnapShot(snapshotId);

        //grab block after reverting time
        const revertedBlock = await web3.eth.getBlock('latest')
        assert.equal(blockBefore.timestamp, revertedBlock.timestamp, "Time and block have been reverted")
    })
});
