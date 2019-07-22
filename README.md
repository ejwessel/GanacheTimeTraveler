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
moves the time forward
```javascript
helper.advanceTime(<seconds_to_advance_by>)
```
### advancing block
moves the block forward
```javascript
helper.advanceBlock()
```
### advance time and block
combination of both `advanceTime` and `advanceBlock`
```javascript
helper.advanceTimeAndBlock(<seconds_to_advance_by>)
```

### take snapshot
takes a snapshot of the block id and returns it
```
helper.takeSnapshot()
```

### revert to snapshot
reverts to snapshot id
```
helper.revertToSnapShot(snapshotId);
```


example is here https://github.com/ejwessel/TimeContract
