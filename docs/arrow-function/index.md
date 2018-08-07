# Arrow Function

## Arrow function can be used to define a method of an object using object literal

```javascript
var foot = {
    kick: function () {
        this.yelp = "Ouch!";
        setTimeout(() => assert(this.yelp === 'Ouch!', 'Arrow function can be used to define a method'), 0);
    }
};
foot.kick();

const step = foot.step;
step();

```
<!-- js-console -->
