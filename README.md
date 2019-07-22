# ganache-time-traveler
A testing toolset that allows developers to write unit test without time dependencies inherit to the blockchain. 

## Install
1. Ensure that ganache-cli and truffle are installed
2. Run the following command within your project:
    `npm install ganache-time-traveler` 

## Usage

#### Reverting back time
For tests that require a specific prior state you use the snapshot functions witin the beforeEach and afterEach hooks to revert back before the test was run in the blockchain. These are good for tests that require some set transations for the unit to process.

 ```javascript
    let snapshotId;

    beforeEach(async() => {
        let snapShot = await helper.takeSnapshot();
        snapshotId = snapShot['result'];
    });

    afterEach(async() => {
        await helper.revertToSnapShot(snapshotId);
    });
 ```

#### Jumping forward in time

example usage is here https://github.com/ejwessel/TimeContract
