const _ = require('lodash');

Array.prototype.addScopes = function (scopes) {
  this._scopes = scopes;
};

// Array.prototype._toJSON = Array.prototype.toJSON;
Array.prototype.toJSON = function () {
  const _scopes = this._scopes || [];

  return this.map(item => {
    return _scopes ? item.toJSON(_scopes) : item;
  });
}

const users = [{name: 'a'}, {name: 'b'}];

console.log(JSON.stringify(users));
