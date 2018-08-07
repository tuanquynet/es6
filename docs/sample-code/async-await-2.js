async function task1() {
  console.log('start task1');
  return new Promise((resolve) => {
      setTimeout(resolve.bind(null, 'task1 done'), 2000);
  });
}
async function task2() {
  console.log('start task2');
  return new Promise((resolve) => {
      setTimeout(resolve.bind(null, 'task2 done'), 1000);
  });
}

async function runTaskSequentially() {
  console.log('=== runTaskSequentially ===');
  const task1Result = await task1();
  const task2Result = await task2();

  return [task1Result, task2Result];
}

async function runTaskInParallel() {
  console.log('=== runTaskInParallel ===');
  const task1Result = task1();
  const task2Result = task2();

  return Promise.all([task1Result, task2Result]);
}

// runTaskSequentially()
//   .then((results) => {
//       console.log(results);
//   });

// console.log('===================');
// runTaskInParallel()
//   .then((results) => {
//       console.log(results);
//   });
let explanation = "";
// Parallel or Senquency
function runPromisesInSequence(funcs) {
  console.log(funcs);
  return funcs.reduce((cur, func) => {
    explanation += !explanation ? `cur.then(func${func._name})` : `\n.then(func${func._name})`;
    return cur.then(results => func().then(Array.prototype.concat.bind(results)));
  }, Promise.resolve([]));
}

async function createTasks() {
  const funcs = (Array(4)
    .fill('').map((value, key) => {
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
    })
  );

  console.log(funcs);
  return funcs;
}

async function runTaskWithPromise() {
  const funcs = await createTasks();
  const results = runPromisesInSequence(funcs);
  // console.log('explanation');
  // console.log(explanation);
  return results;
}

async function runTaskInWithLoop(tasks) {
  const funcs = createTasks();
  const result = [];
  for (let index = 0; index < funcs.length; index++) {
    const f = funcs[index];
    console.log(`before ${f._name}`);
    result[f._name] = await f();
    console.log(`after ${f._name}`);
  }

  return result;
}

runTaskWithPromise().then((results) => {
  console.log('results');
  console.log(results);
  // process.exit(0);
});

runTaskInSyncWay().then((results) => {
  console.log('results');
  console.log(results);
  // process.exit(0);
});

// Run Promises sequentially

setInterval(() => {}, 1000);
