const add = (a, b) => {
    return a + b;
};

console.log(add(1, 2));

const toAdd = [9, 5];
console.log(add(toAdd[0], toAdd[1]));

console.log(add(...toAdd));

const groupA = ['Jen', 'Cory'];
const groupB = ['Vikram'];
const final = [...groupB, 3, ...groupA];

console.log(final);

const person = ['Andrew', 25];
const person2 = ['Ams', 46];

const greeter = (name, age) => {
    return `Hi ${name}, you are ${age}`;
};

console.log(greeter(...person));
console.log(greeter(...person2));

const names = ['Mike', 'Ben'];
const finalArray = ['Andrew', ...names];

finalArray.forEach((name) => {
    console.log(`Hi ${name}`);
});
