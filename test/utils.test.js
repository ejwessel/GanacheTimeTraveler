const helper = require('../utils.js')

const SECONDS_IN_DAY = 86400

contract('Test Utils', async () =>  {

    it("Test advanceBlock", async() => {
        const currentBlock = await web3.eth.getBlock('latest')
        const currentBlockNum = currentBlock.number

        await helper.advanceBlock()
        
        const advancedBlock = await web3.eth.getBlock('latest')
        const advanceBlockNum = advancedBlock.number
        
        assert.equal(currentBlockNum + 1, advanceBlockNum, "New block was not mined")
    })

    it("Test advanceTime", async() => {
        const currentBlock = await web3.eth.getBlock('latest')

        await helper.advanceTime(SECONDS_IN_DAY);
        await helper.advanceBlock() // advanced time does not show unless block has been mined and shown in new block
        
        const advancedBlock = await web3.eth.getBlock('latest')
        assert.isBelow(currentBlock.timestamp, advancedBlock.timestamp, "Time was not advanced")
    })

    it("Test advanceTimeAndBlock", async() => {
        const currentBlock = await web3.eth.getBlock('latest')
        await helper.advanceTimeAndBlock(SECONDS_IN_DAY)

        const advancedBlock = await web3.eth.getBlock('latest')
        assert.isBelow(currentBlock.timestamp, advancedBlock.timestamp, "Time and Block was not advanced")
    })

    it("Test takeSnapshot", async() => {
        const snapshot = await helper.takeSnapshot()
        const snapshotId = snapshot.result
        assert.exists(snapshotId, "Unable to produce snapshot")
    })

    it("Test revertToSnapShot", async() => {
        // initial data captured
        const snapshot = await helper.takeSnapshot()
        const snapshotId = snapshot.result
        const currentBlock = await web3.eth.getBlock('latest')

        // time advanced to simulated that other transactions occured over a day
        await helper.advanceTimeAndBlock(SECONDS_IN_DAY)
        const advancedBlock = await web3.eth.getBlock('latest')
        assert.isBelow(currentBlock.timestamp, advancedBlock.timestamp, "Time was not advanced")

        await helper.revertToSnapShot(snapshotId);
        const revertedBlock = await web3.eth.getBlock('latest')

        assert.equal(currentBlock.timestamp, revertedBlock.timestamp, "Time and block has been reverted")
    })
});
