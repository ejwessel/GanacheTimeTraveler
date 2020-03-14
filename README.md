<img width="20%" height="20%" src="https://raw.githubusercontent.com/ejwessel/GanacheTimeTraveler/master/blackhole.png">

 
# ganache-time-traveler
A testing toolset that allows developers to write unit tests for the Ethereum blockchain.

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
add `require` at the top of your tests
```javascript
const timeMachine = require('ganache-time-traveler');
```

add the `beforeEach` and `afterEach` hooks into your test file
 ```javascript
beforeEach(async() => {
    let snapShot = await timeMachine.takeSnapshot();
    snapshotId = snapShot['result'];
});

afterEach(async() => {
    await timeMachine.revertToSnapshot(snapshotId);
});
 ```

## Resources
- https://github.com/trufflesuite/ganache-cli
- https://www.trufflesuite.com
- [Icon created by Focus Lab from Noun Project](https://thenounproject.com/search/?q=space%20and%20time&i=547869)