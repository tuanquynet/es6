async function task1() {
    return Promise.resolve('done');
}

async function task2() {
    return Promise.resolve('done');
}

async function doTasks(params) {
    const tasks = [task1, task2];
    await tasks.map((task) => {
        return task();
    });

    return 'all-done';
}

// Question: There is any problem with the above code?
