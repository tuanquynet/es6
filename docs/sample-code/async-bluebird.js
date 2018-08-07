const _ = require('request');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

async function getProduct() {
  const readFile = Promise.promisify(fs.readFile);
  const content = await readFile(path.join(__dirname, './data/product.json'), 'utf8');
  console.log('content');
  console.log(content);
}

// getProduct();

async function checkIfBluebirdPromiseHasMap() {
  const promise = Promise.resolve([1,2,3]);
  // bluebird provide method promise.map therefore no exception here
  const result = await promise.map(value => value * 10);
  return result;
}

async function checkIfPromiseHasMap() {
  // use native promise
  const promise = global.Promise.resolve([1,2,3]);
  const result = await promise.map(value => value * 10);
  return result;
}

checkIfBluebirdPromiseHasMap().then((results) => {
  console.log('checkIfBluebirdPromiseHasMap results');
  console.log(results);
});

checkIfPromiseHasMap()
  .then((results) => {
    console.log('results');
    console.log(results);
  })
  .catch((err) => {
    console.log('Exception occured in checkIfPromiseHasMap');
    console.log(err.message)
  });

setTimeout(() => {
  process.exit(0);
}, 1000);
