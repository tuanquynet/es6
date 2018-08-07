const _ = require('lodash');

async function getName() {
  return Promise.resolve('new name');
}

async function getName2() {
  return 'new name';
}

async function getNameWithException() {
  throw new Error('there is some problem in getNameWithException function');
  return 'new name';
}

async function getNameWithReject() {
  return Promise.reject(new Error('there is some problem in getNameWithReject function'));
}

async function exceptionInSyncFunc() {
  return this.notAFunction();
}

async function getNameWithAwaitException() {
  return await getNameWithException();
}

async function getUserWithNestedException() {
  const userName = await getNameWithAwaitException();
  // userName is supposed to be 'string' but it is error object.
  console.log('get user result userName');
  console.log(userName);

  return {userName};
}

async function callMultipleAwait(params) {
  async function delayFunc() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve('Finish');
      }, 5000);
    });
  }

  // const value = await delayFunc();

  // console.log(value);

  return getName();
}

// pitchfall
async function awaitOnArrayOfPromise(params) {
  // It wrong syntax. We can fix it by wrapping in Promise.all(...)
  let value;

  value = await [10].map((i) => {
    return Promise.resolve(i);
  })
  //* Add the first flash '/' to uncomment the following block
  value = await Promise.all([10].map((i) => {
    return Promise.resolve(i);
  }));
  //*/

  console.log('awaitOnArrayOfPromise print value');
  console.log(value);

  return 'Finish';
}

getName().then((name) => {
  console.log(name);
})

getName2().then((name) => {
  console.log(name);
})
/*
getNameWithException()
  .then((name) => {
    console.log(name);
  })
  .catch((err) => {
    console.log(err.message);
  })

getNameWithReject()
  .then((name) => {
    console.log(name);
  })
  .catch((err) => {
    console.log(err.message);
  })

getNameWithAwaitException()
  .then((name) => {
    console.log(name);
  })
  .catch((err) => {
    console.log(err.message);
  })

exceptionInSyncFunc()
  .then((result) => {
    console.log('exceptionInSyncFunc ',result );
  })
  .catch((err) => {
    console.log(err.message);
    throw err;
  })

getUserWithNestedException()
  .then((result) => {
    console.log('getUserWithNestedException ', result );
  })
  .catch((err) => {
    console.log('getUserWithNestedException err' );
    console.log(err.message);
    throw err;
  });
 */
/*
callMultipleAwait()
  .then(() => {
    console.log('callMultipleAwait finish');
  });
 */
awaitOnArrayOfPromise()
  .then(() => {
    console.log('awaitOnArrayOfPromise finish');
  });

setInterval(() => {
//   process.exit(0);
}, 2000);
