# Callback

## We use callback to handle an event
```javascript
window.addEventListener('load', (event) => {
    alert('load');
});

document.addEventListener('click', (event) => {
    alert('click on document');
});
```

## Callback in NodeJS API

```javascript
const fs = require('fs');
fs.readFile('data/products.json', (err, data) => {
    console.log(data);
})
```

## Try/catch callback

```javascript
function getUsers(userId, callback) {
    const users = [{id:1,name:'john'}];
    setTimeout(() => {
        user = users[1];
        user.name = 'david';
        callback(users);
    }, 0);
}

function main() {
    try {
        getUsers(1, (results) => {
            console.log(results);
        });
    } catch (err) {
        console.error(err);
    }
}
```
