// NOTES: to test with babel `node --require babel-register script.js`
const id = 22222;
const invite = {
  id: 11111,
  firstName: '11111'
};
const inviteNoId = {
  firstName: '11111'
};

const newInvite = {
  ...invite,
  id,
}

const newInvite2 = {
  id,
  ...invite,
}

const newInviteNoId = {
  ...inviteNoId,
  id,
}

console.log('newInvite');
console.log(newInvite);

console.log('newInvite2');
console.log(newInvite2);

console.log('newInviteNoId');
console.log(newInviteNoId);
