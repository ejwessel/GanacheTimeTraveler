# ganache-time-traveler
A testing toolset that allows developers to write unit tests

without time dependencies inherit to the blockchain. 

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

## Other methods
### advancing time
helper.advanceTimeAndBlock(<seconds_to_advance_by>)


example usage is here https://github.com/ejwessel/TimeContract
