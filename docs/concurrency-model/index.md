# Concurrency model

## JavaScript has concurrency model based on "event loop"

## Stack

```javascript
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7)); //returns 42

```
When calling `bar`, first frame is created containing `bar`'s argument and its local variables
when `bar` call foo, the second frame is created and pushed on top of the first one containing `foo`'s arguments and local variables. When `foo` returns, the top frame element is popped out of the stack. When `bar` return, the stack is empty.

## Heap
Objects are allocated in a heap. Heap is unstructured region of memory.

## Queue
All function invocation will be put in message queue to be processed. Each message has associated function which gets called in order to handle message

During event loop, the runtime will pick oldest on in message queue to process. When calling a function, runtime of course will create stack frame for that function's use.

The processing of function continues until the stack is once again empty. Then the event loop will process next message.

If the message take too long to complete, browser will show "a script is taking too long to run" dialog. A good practice to follow is to make message processing short or cut down on message into several messages.

## Adding message
In web browser, messages are added when an event occur.

## Zero delays
Zero delay doesn't actually mean the call back will fire-off after zero milliseconds. Calling setTimeout with a delay of 0 (zero) milliseconds doesn't execute the callback function after the given interval.
