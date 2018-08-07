# Async/Await

## We can consider async/await as sugar code

The following block of code.
```javascript
async function task() {
  return 10;
}
```

**Will be transpiled to**

```javascript
function task() {
  return Promise.resolve(10);
}
```

And the following block of code.
```javascript
async function task() {
  const users = await fetch('https://mock-api.tuanquynet.click/v1/users');

  return users;
}
```

**Will be transpiled to**

```javascript
function task() {
  const promise = Promise.resolve(fetch('https://mock-api.tuanquynet.click/v1/users'));
  
  return promise.then((result) => {
      return result;
  })
}
```

Let's check it
```javascript
async function task() {
  return 10;
}

const result = task();
assert(result instanceof Promise, 'result returned from async function is a Promised value');
```

## We can not put await before an array of promises
```javascript
async function handleArrayOfPromise() {
    const results = await Array(10).fill(Math.random()).map((value, key) => {
        return Promise.resolve(value);
    });

    return results;
}

handleArrayOfPromise().then((results) => {console.log(results);});
```


## Run tasks in sequence

```javascript
const executedSteps = [];
async function task1() {
  console.log('start task1');
  executedSteps.push('task1');
  return new Promise((resolve) => {
      setTimeout(() => {
          executedSteps.push('task1 done');
          resolve.bind(null, 'task1 done');
      }, 2000);
  });
}

async function task2() {
  executedSteps.push('task2 start');
  return new Promise((resolve) => {
      setTimeout(() => {
          executedSteps.push('task2 done');
          resolve.bind(null, 'task2 done');
      }, 1000);
  });
}

async function runTaskSequentially() {
  console.log('=== runTaskSequentially ===');
  const task1Result = await task1();
  const task2Result = await task2();
  return [task1Result, task2Result];
}

runTaskSequentially()
  .then((results) => {
      cosnt [,secondTask] = executedSteps;
      assert(secondTask === 'task2 start', 'The second task is "task2 start"');
      console.log(executedSteps);
  });

```
<!-- js-console -->

## Run tasks in parallel, actually in concurrency

```javascript
const executedSteps = [];
async function task1() {
  executedSteps.push('task1');
  return new Promise((resolve) => {
      setTimeout(() => {
          executedSteps.push('task1 done');
          resolve.bind(null, 'task1 done');
      }, 2000);
  });
}

async function task2() {
  executedSteps.push('task2 start');
  return new Promise((resolve) => {
      setTimeout(() => {
          executedSteps.push('task2 done');
          resolve.bind(null, 'task2 done');
      }, 1000);
  });
}

async function runTaskInParallel() {
  const task1Result = task1();
  const task2Result = task2();

  return Promise.all([task1Result, task2Result]);
}

console.log('===================');
runTaskInParallel()
  .then((results) => {
      cosnt [,secondTask] = executedSteps;
      assert(secondTask === 'task2 start', 'The second step is "task2 start"');
      console.log(executedSteps);
  });
```
<!-- js-console -->

## Do not mess up callback and promise


## Do not mess up callback and promise

An async function should not accept callback function parameter
```javascript
// Don't declare this kind of function
async function (callback) {
    // Do something in async
}
```

## Do not need to convert returned value to promised-base value inside async function

```javascript
async function getUserName() {
    return 'john';
}

async function getUserNameWithPromise() {
    return Promise.resolve('john');
}

const john = await getUserName();
const anotherJohn = await getUserNameWithPromise();

assert(john === anotherJohn, 'Value returned by async function is promised-wrap value');

```
<!-- js-console -->

```javascript
function runPromisesInSequence(funcs) {
  return funcs.reduce((cur, func) => {
    return cur.then(results => func().then(Array.prototype.concat.bind(results)));
  }, Promise.resolve([]));
}

// a list of async functions
const tasks = Array(3).fill('').map((value, key) => {
    const delay = 1000 * (4 - key);
    console.log(`create task ${key} will delay in ${delay}`);

    const f = async () => {
      console.log(`start task ${key}`);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`task ${key} done`);
        }, delay);
      });
    };

    f._name = key;
    return f;
});

const wrappingFuncs = tasks.map((promise) => {
    const func = async () => {
        return promise;
    }

    return funcs;
});

const results = await runPromisesInSequence(wrappingFuncs);
console.log(results);
```
<!-- js-console -->
