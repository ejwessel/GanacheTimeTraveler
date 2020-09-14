<img width="20%" height="20%" src="https://raw.githubusercontent.com/ejwessel/GanacheTimeTraveler/master/blackhole.png">

 
# ganache-time-traveler
A ganache utility that simplifies writing time dependent or stateless tests on a local Ethereum blockchain.

- [Read my Medium Post](https://medium.com/fluidity/standing-the-time-of-test-b906fcc374a9)

- [Watch my Presentation](https://photos.app.goo.gl/6qkd5AN2BthxkY2K6)

- [Time Contract Example](https://github.com/ejwessel/TimeContract)


NOTE:
- this only works with ganache-cli
- this only works locally

## Tool Dependencies
- [ganache-cli](https://github.com/trufflesuite/ganache-cli)
- [truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

## Install
- `npm i ganache-time-traveler`

## Usage
The general outline is to add `require` at the top of your tests
```javascript
const timeMachine = require('ganache-time-traveler');
```

add the `beforeEach` and `afterEach` hooks into your truffle test file
 ```javascript
contract('Test', async (accounts) =>  {

    let exampleContract;

    beforeEach(async() => {
        let snapshot = await timeMachine.takeSnapshot();
        snapshotId = snapshot['result'];
    });

    afterEach(async() => {
        await timeMachine.revertToSnapshot(snapshotId);
    });

    before('Deploy Contracts', async() => {
        /* DEPLOY CONTRACTS HERE */
        exampleContract = await ExampleContract.new();
    });

    /* ADD TESTS HERE */

    it('Time Dependent Test', async () => {
        await timeMachine.advanceTimeAndBlock(/* SECONDS TO ADVANCE BY */);
    });
});
 ```

## Methods
### `advanceTime(<seconds_to_advance_by>)`
Advances the time on the blockchain forward. Takes a single parameter, which is the number of seconds to advance by.
Note: for advancetime() to take effect, the block must also be mined using `advanceBlock()`. See `advanceTimeAndBlock()` to do both.

### `advanceBlock()`
Mines a new block; advances the block forward by 1 block.

### `advanceBlockAndSetTime(<new_time>)`
Advances the block forward by 1 and **sets** the time to a new time.

### `advanceTimeAndBlock(<seconds_to_advance_by>)`
Advances the block by 1 in addition to advancing the time on the blockchain forward. Takes a single parameter, which is the number of seconds to advance by.

### `takeSnapshot()`
Snapshot the state of the blockchain at the current block. Takes no parameters. Returns the integer id of the snapshot created.

### `revertToSnapshot(<id_to_revert_to>)`
Revert the state of the blockchain to a previous snapshot. Takes a single parameter, which is the snapshot id to revert to.

## Resources
- https://github.com/trufflesuite/ganache-cli
- https://www.trufflesuite.com
- [Icon created by Focus Lab from Noun Project](https://thenounproject.com/search/?q=space%20and%20time&i=547869)
