/* global web3,  */ // ignore those keywords when linting
/*
* Use of code from https://medium.com/edgefund/time-travelling-truffle-tests-f581c1964687
* Utility functions to advance blocktime and mine blocks artificially for EVM
*/
advanceTime = (time) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [time],
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err) }
      return resolve(result)
    })
  })
}

advanceBlock = () => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err) }
      const newBlockHash = web3.eth.getBlock('latest').hash

      return resolve(newBlockHash)
    })
  })
}

advanceBlockAndSetTime = async (time) => {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [time],
        id: new Date().getTime()
    }, (err) => {
        if (err) { return err }
        const newBlockHash = web3.eth.getBlock('latest').hash

        return newBlockHash
    })
}

advanceTimeAndBlock = async (time) => {
    //capture current time
    let block = await web3.eth.getBlock('latest')
    let forwardTime = block['timestamp'] + time

    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [forwardTime],
        id: new Date().getTime()
    }, (err) => {
        if (err) { return err }
        const newBlockHash = web3.eth.getBlock('latest').hash
        return newBlockHash
    })
}

takeSnapshot = async () => {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_snapshot',
        id: new Date().getTime()
    }, (err, snapshotId) => {
        if (err) { return err }
        return snapshotId
    })
}

revertToSnapshot = async (id) => {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_revert',
        params: [id],
        id: new Date().getTime()
    }, (err, result) => {
        if (err) { return err }
        return result
    })
}

module.exports = {
  advanceTime,
  advanceBlock,
  advanceBlockAndSetTime,
  advanceTimeAndBlock,
  takeSnapshot,
  revertToSnapshot
}
