# Run in sequence

Use then to run task1, task2 one by one.

```javascript
function task1() {
    return new Promise((resolve, reject) => {
        setTimeout()
    });
}
```

# Run in parallel (actually in concurrency)

Use Promise.all()
