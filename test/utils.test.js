const helper = require('../utils.js');

const SECONDS_IN_DAY = 86400;

contract('TimeContract', async (accounts) =>  {

    it("Test advanceTime", async() => {
        //capture before time
        //await helper.advanceTime(SECONDS_IN_DAY)
        //capture after time
        //assert after time is later than before time by number of seconds
    })

    it("Test advanceBlock", async() => {
        //capture block id before
        //await helper.advanceBlock()
        //capture block id after
        //assert that block is later than before block
    })

    it("Test advanceTimeAndBlock", async() => {
        //capture before time
        //await helper.advanceTimeAndBlock(SECONDS_IN_DAY)
        //capture after time
        //assert after time is later than before time by number of seconds
    })

    it("Test takeSnapshot", async() => {
        //capture id
        //snapShot = await helper.takeSnapshot();
        //snapshotId = snapShot['result'];
        //assert there is an id
    })

    it("Test revertToSnapShot", async() => {
        //id = await helper.takeSnapshot()
        //move time forward
        //assert time moved
        //await helper.revertToSnapshot(id)
        //assert time reverted
    })
});
