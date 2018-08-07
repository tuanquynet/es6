# Promise

## Asynchronous Programming

JavaScript was created for Web. It handle asynchronous tasks, such as user interaction, async loading data from server, easily. Previously, we can handle asynchronous task using event, callback. But these approachs make our code hard to read. Maybe you have heard about callback.

A Promise is an object representing the eventual completion or failure of an asynchronous operation.


## Create promise
```javascript
const aPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resole(true);
        // if something is wrong or exception occur
        // reject('reason')
    }, 1000);
});
```

## Convert a value to promsise
```javascript
let connection;
function createConnnection() {
    if (connection) {
        return Promise.resolve(connection);
    }

    // This is async task
    return dbDriver.createConnection({})
        .then((conn) => {
            connection = conn;
            return connection;
        });
}
```

## Catch exception
```javascript
function task1() {
    return Promise.reject(new Error('unknown exception'));
}

async function tryCatchPromise() {
    try {
        // Fix it by adding await or return result of task1
        return task1();
    } catch (err) {
        throw Error('tryCatchPromise');
    }

    return 'We can use try..catch with promised-base function';
}

async function runWithAwait() {
    try {
        await task1();
    } catch (err) {
        throw Error('We can use try..catch with await');
    }
}

async function tryCatchPromiseAndReturn() {
    try {
        return task1();
    } catch (err) {
        throw Error('We can use try..catch after return');
    }
}

tryCatchPromise()
    .then((result) => {
        console.log(result);
        return result;
    })
    .catch((err) => {
        console.log('==== tryCatchPromise ====');
        console.log(err.message);
    });

runWithAwait()
    .then(() => {})
    .catch((err) => {
        console.log('==== runWithAwait ====');
        console.log(err.message);
    });

tryCatchPromiseAndReturn()
    .then(() => {})
    .catch((err) => {
        console.log('==== tryCatchPromiseAndReturn ====');
        console.log(err.message);
        // console.log(err);
    });

```
<!-- js-console -->
