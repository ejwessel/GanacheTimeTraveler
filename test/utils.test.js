const helper = require('../utils.js')

const SECONDS_IN_DAY = 86400

contract('Test Utils', async () =>  {
    it("Test advanceBlock", async() => {
        //grab block before advancing blocks 
        const blockBefore = await web3.eth.getBlock('latest')
        const blockNumberBefore = blockBefore.number

        await helper.advanceBlock()
        
        //grab block after advancing blocks 
        const blockAfter = await web3.eth.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        assert.equal(blockNumberBefore + 1, blockNumberAfter, "New block was not mined")
    })

    it("Test advanceTime", async() => {
        const blockBefore = await web3.eth.getBlock('latest')
        const blockNumberBefore = blockBefore.number
        const timeBefore = blockBefore.timestamp

        await helper.advanceTime(SECONDS_IN_DAY);
        //time doesn't update unless block is mined
        await helper.advanceBlock()
        
        const blockAfter = await web3.eth.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        assert.equal(blockNumberBefore + 1, blockNumberAfter, "New block was not mined")

        const timeAfter = blockAfter.timestamp
        assert.isBelow(timeBefore, timeAfter, "Time was not advanced")
    })

    it("Test advanceBlockAndSetTime", async() => {
        const blockBefore = await web3.eth.getBlock('latest')
        const blockNumberBefore = blockBefore.number
        const timeBefore = blockBefore.timestamp
        
        // move time backwards
        await helper.advanceBlockAndSetTime(timeBefore - SECONDS_IN_DAY);
        
        const blockAfter = await web3.eth.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        const timeAfter = blockAfter.timestamp
        assert.isBelow(timeAfter, timeBefore, "Time was not set back")
        assert.isBelow(blockNumberBefore, blockNumberAfter, "Block was not advanced")
    })

    it("Test advanceTimeAndBlock", async() => {
        const blockBefore = await web3.eth.getBlock('latest') 
        const blockNumberBefore = blockBefore.number
        const timeBefore = blockBefore.timestamp

        await helper.advanceTimeAndBlock(SECONDS_IN_DAY);
        
        const blockAfter = await web3.eth.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        const timeAfter = blockAfter.timestamp
        assert.isBelow(timeBefore, timeAfter, "Time and Block were not advanced")
        assert.isBelow(blockNumberBefore, blockNumberAfter, "Block was not advanced")
    })

    it("Test takeSnapshot", async() => {
        const snapshot = await helper.takeSnapshot()
        const snapshotId = snapshot.result
        assert.exists(snapshotId, "Unable to produce snapshot")
    })

    it("Test revertToSnapshot", async() => {
        // grab block before advancing time
        const snapshot = await helper.takeSnapshot()
        const snapshotId = snapshot.result
        const blockBefore = await web3.eth.getBlock('latest')
        const timeBefore = blockBefore.timestamp

        // advance time forward
        await helper.advanceTimeAndBlock(SECONDS_IN_DAY)
        const blockAfter = await web3.eth.getBlock('latest')
        const timeAfter = blockAfter.timestamp
        assert.isBelow(timeBefore, timeAfter, "Time did not advance")

        await helper.revertToSnapshot(snapshotId)

        //grab block after reverting time
        const blockReverted = await web3.eth.getBlock('latest')
        const timeReverted = blockReverted.timestamp
        assert.equal(timeBefore, timeReverted, "Time and block have been reverted")
    })
});
