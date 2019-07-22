# ganache-time-traveler
A testing toolset that allows developers to write unit tests for the ethereum blockchain.

NOTE:
- this only works with ganache-cli
- this only works locally

## Dependencies
- [ganache-cli](https://github.com/trufflesuite/ganache-cli)
- [truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

## Install
- `npm i ganache-time-traveler`

## Usage
add `require` at the top of your tests
```javascript
const helper = require('ganache-time-traveler');
```

add the `beforeEach` and `afterEach` hooks into your test file
 ```javascript
beforeEach(async() => {
    let snapShot = await helper.takeSnapshot();
    snapshotId = snapShot['result'];
});

afterEach(async() => {
    await helper.revertToSnapShot(snapshotId);
});
 ```

## Breakdown of methods
### advancing time
advances the time on the blockchain forward. Takes a single parameter, which is the number of seconds to advance by.
```javascript
helper.advanceTime(<seconds_to_advance_by>)
```
### advancing block
advances the block forward.
```javascript
helper.advanceBlock()
```
### advance time and block
combination of both `advanceTime` and `advanceBlock`
```javascript
helper.advanceTimeAndBlock(<seconds_to_advance_by>)
```

### take snapshot
_Snapshot the state of the blockchain at the current block. Takes no parameters. Returns the integer id of the snapshot created._
```javascript
helper.takeSnapshot()
```

### revert to snapshot
_Revert the state of the blockchain to a previous snapshot. Takes a single parameter, which is the snapshot id to revert to._
```javascript
## Usage
helper.revertToSnapShot(<id_to_revert_to>);
```

## Resources
- https://github.com/trufflesuite/ganache-cli
- https://www.trufflesuite.com

[Read my Medium Post](https://medium.com/fluidity/standing-the-time-of-test-b906fcc374a9)
