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
