// -------------------------------------------------- CHAPTER 1 --------------------------------------------------------
// url: https://egghead.io/lessons/javascript-linear-data-flow-with-container-style-types-box
// Create linear data flow with container style types (Box)
console.log('// -------------------------------------------------- CHAPTER 1 ---------------------------------------' +
    '-----------------');

// Imperative JS
const nextCharForNumberStringNotFP = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
};

const resultOfNextCharForNumberStringNotFP = nextCharForNumberStringNotFP(' 64 ');

// Following will fail miserably
// console.log(nextCharForNumberStringNotFP(null));

console.log(`nextCharForNumberStringNotFP(' 64 ')' is: ${resultOfNextCharForNumberStringNotFP}`);
console.log('');

// First step to FP
const nextCharForNumberStringArrFP = str => {
    return [str]
        .map(s => s.trim())
        .map(s => parseInt(s))
        .map(i => i + 1)
        .map(i => String.fromCharCode(i));
};

const resultOfNextCharForNumberStringArrFP = nextCharForNumberStringArrFP(' 64 ');

console.log(`nextCharForNumberStringArrFP(' 64 ')' is: ${resultOfNextCharForNumberStringArrFP}`);
console.log('');

// Following will fail miserably
// console.log(nextCharForNumberStringArrFP(null));

// Next refactor, into an algebraic data type called a Box
// This is also the Identity function
const Box = x => ({
    map    : f => Box(f(x)),
    fold   : f => f(x),
    inspect: () => `Box(${x})`
});

const nextCharFromNumberStringUsingBox = str => {
    return Box(str)
        .map(s => s.trim())
        .map(s => parseInt(s))
        .map(i => i + 1)
        .fold(i => String.fromCharCode(i));
};

const resultOfNextCharFromNumberStringUsingBox = nextCharFromNumberStringUsingBox(' 64 ');

console.log(`nextCharFromNumberStringUsingBox(' 64 ')' is: `, resultOfNextCharFromNumberStringUsingBox);
console.log('');

// -------------------------------------------------- CHAPTER 2 --------------------------------------------------------
// url: https://egghead.io/lessons/javascript-refactoring-imperative-code-to-a-single-composed-expression-using-box
console.log('// -------------------------------------------------- CHAPTER 2 ----------------------------------------' +
    '----------------');

// Imperative JS
const moneyToFloatNonFP = str => parseFloat(str.replace(/\$/g, ''));

const percentToFloatNonFP = str => {
    const replaced = str.replace(/\%/g, '');
    const number = parseFloat(replaced);
    return number * 0.01;
};

const applyDiscountNonFP = (price, discount) => {
    const cost = moneyToFloatNonFP(price);
    const savings = percentToFloatNonFP(discount);
    return cost - cost * savings;
};

const resultOfApplyDiscountNonFP = applyDiscountNonFP('$50', '10%');

console.log(`applyDiscountNonFP('$50', '10%') is: `, resultOfApplyDiscountNonFP);
console.log('');

const moneyToFloatUsingBox = str =>
    Box(str)
        .map(s => s.replace(/\$/g, ''))
        .map(r => parseFloat(r));

const percentToFloatUsingBox = str =>
    Box(str.replace(/\%/g, ''))
        .map(s => parseFloat(s))
        .map(r => r * 0.01);

// Watch the indentation. Each level deals with the assignment in the applyDiscountNonFP function definition for the
// consts cost and savings. Also note the use of fold in the right places, as moneyToFloatUsingBox and
// percentToFloatUsingBox return a Box ;)
const applyDiscountUsingBox = (price, discount) =>
    moneyToFloatUsingBox(price)
        .fold(cost =>
            percentToFloatUsingBox(discount)
                .fold(savings =>
                cost - cost * savings));

const resultOfApplyDiscountUsingBox = applyDiscountUsingBox('$50', '10%');
console.log(`applyDiscountUsingBox('$50', '10%') is: `, resultOfApplyDiscountUsingBox);
console.log('');

// -------------------------------------------------- CHAPTER 3 --------------------------------------------------------
// url: https://egghead.io/lessons/javascript-composable-code-branching-with-either
// The concept of Either

console.log('// -------------------------------------------------- CHAPTER 3 ---------------------------------------' +
    '-----------------');

const Right = x => ({
    chain  : f => f(x),
    map    : f => Right(f(x)),
    fold   : (f, g) => g(x),
    inspect: () => `Right(${x})`
});

const Left = x => ({
    chain  : f => Left(x),
    map    : f => Left(x),
    fold   : (f, g) => f(x),
    inspect: () => `Left(${x})`
});

const resultOfRightLeftNoError = Right(2).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
console.log(`resultUsingRightLeft is: `, resultOfRightLeftNoError);
console.log('');

const resultOfRightLeftError = Left(2).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
console.log(`resultUsingRightLeft is: `, resultOfRightLeftError);
console.log('');

const findColorNonFP = name => ({red: '#ff0000', green: '#00ff00', blue: '#0000ff'})[name];

const resultOfFindColorNonFP = findColorNonFP('red');
console.log(`resultOfFindColorNonFP is: `, resultOfFindColorNonFP);
console.log('');

// Following will return undefined
// const resultOfFindColorNonFP = findColorNonFP('redd');

// One error scenario could be:
// See that further calling methods slice and then toUpperCase would crash the code
// const resultOfFindColorNonFP2 = findColorNonFP('redd').slice(1).toUpperCase();

const fromNullable = x => x != null ? Right(x) : Left(null);

const findColorNonFPWithErrorHandling = name =>
    fromNullable({red: '#ff0000', green: '#00ff00', blue: '#0000ff'}[name]);

const resultOfFindColorNonFPWithErrorHandling = findColorNonFPWithErrorHandling('red')
    .map(s => s.slice(1))
    .fold(
        e => 'no color',
        c => c.toUpperCase()
    );
console.log(`resultOfFindColorNonFPWithErrorHandling is: `, resultOfFindColorNonFPWithErrorHandling);
console.log('');

// -------------------------------------------------- CHAPTER 3 --------------------------------------------------------
// url: https://egghead.io/lessons/javascript-composable-error-handling-with-either

console.log('// -------------------------------------------------- CHAPTER 4 ---------------------------------------' +
    '-----------------');

const fs = require('fs');

const getPortNonFP = () => {
    try {
        const str = fs.readFileSync('config.json');
        const config = JSON.parse(str);
        return config.port;
    } catch (e) {
        console.log('e');
        return 3000;
    }
};

const resultOfGetPortNonFP = getPortNonFP();
console.log('resultOfGetPortNonFP is: ', resultOfGetPortNonFP);
console.log('');

const tryCatch = f => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
};

const getPortUsingEither = (fileName) =>
    tryCatch(() => fs.readFileSync(fileName))
        .chain(c => tryCatch(() => JSON.parse(c)))
        .fold(
            e => 3000,
            c => c.port
        );

const resultOfGetPortUsingEither = getPortUsingEither('config.json');
console.log('resultOfGetPortUsingEither is: ', resultOfGetPortUsingEither);
console.log('');

// -------------------------------------------------- CHAPTER 5 --------------------------------------------------------
// url: https://egghead.io/lessons/javascript-a-collection-of-either-examples-compared-to-imperative-code

console.log('// -------------------------------------------------- CHAPTER 5 ---------------------------------------' +
    '-----------------');

// Comparison of imperative code vis-a-vis Either

// Dummies
const currentUser = 'Pooper';
const renderPage = () => {
};
const showLogin = () => {
};

const openSiteNonFP = () => {
    if (currentUser) {
        return renderPage(currentUser);
    } else {
        return showLogin();
    }
};

const openSite = () =>
    fromNullable(currentUser)
        .fold(showLogin, renderPage);

// Dummies
const user = {premium: true, preferences: {}};
const loadPrefs = (preferences) => {
};
const defaultPrefs = {};

const getPrefsNonFP = user => {
    if (user.premium) {
        return loadPrefs(user.preferences);
    } else {
        return defaultPrefs;
    }
};

const getPrefs = user =>
    (user.premium ? Right(user) : Left('not premium'))
        .map(u => u.preferences)
        .fold(
            () => defaultPrefs,
            prefs => loadPrefs(prefs)
        );

const streetNameNonFP = user => {
    const address = user.address;
    if (address) {
        const street = address.street;
        if (street) {
            return street.name;
        } else {
            return 'no street';
        }
    }
};

const streetName = user =>
    fromNullable(user.address)
        .chain(a => fromNullable(a.street))
        .map(s => s.name)
        .fold(
            e => 'no street',
            n => n
        );

const concatUniqNonFP = (x, ys) => {
    const found = ys.filter(y => y === x)[0];
    return found ? ys : ys.concat(x);
};

const concatUniq = (x, ys) =>
    fromNullable(ys.filter(y => y === x)[0])
        .fold(() => ys.concat(x), y => ys);

const anArr = [1, 2, 3];
console.log('concatUniq: ', concatUniq(4, anArr), '\n');

const wrapExamplesNonFP = example => {
    if (example.previewPath) {
        try {
            example.preview = fs.readFileSync(example.previewPath);
        } catch (e) {

        }
        return example;
    }
};

const readFile = x => tryCatch(() => rs.readFileSync(x));

const wrapExample = example =>
    fromNullable(example.previewPath)
        .chain(readFile)
        .fold(
            () => example,
            ex => Object.assign({preview: p}, ex)
        );

const parseDbUrlNonFP = cfg => {
    try {
        const c = JSON.parse(cfg);
        if (c.url) {
            return c.url.match(/postgres:\/\/([^:]+):([^@]+)/);
        }
    } catch (e) {
        return null;
    }
};

const parseDbUrl = cfg =>
    tryCatch(JSON.parse(cfg))
        .chain(c => fromNullable(c.url))
        .fold(
            e => null,
            u => u.match(/postgres:\/\/([^:]+):([^@]+)/)
        );

// -------------------------------------------------- CHAPTER 6 --------------------------------------------------------
console.log('// -------------------------------------------------- CHAPTER 6 ---------------------------------------' +
    '-----------------');
// url: https://egghead.io/lessons/javascript-combining-things-with-semigroups

console.log("a".concat("b"));
console.log('');
console.log([1, 2].concat(3));
console.log('');

const Sum = x =>
    ({
        x,
        concat : o => Sum(x + o.x),
        inspect: () => `Sum(${x})`
    });

Sum.empty = () => Sum(0);

const resultOfASimpleSum = Sum(1).concat(Sum(2));
console.log(`resultOfASimpleSum is: `, resultOfASimpleSum);
console.log('');

// true && false // false
// true && true // true

const All = x =>
    ({
        x,
        concat : ({x: y}) => All(x && y),
        inspect: () => `All(${x})`
    });

All.empty = () => All(true);

const resultOfASimpleAll = All(true).concat(All(false).concat(All.empty()));
console.log('resultOfASimpleAll is: ', resultOfASimpleAll);
console.log('');

const First = x =>
    ({
        x,
        concat : _ => First(x),
        inspect: () => `First(${x})`
    });

const resultOfASimpleFirst = First("blah").concat(First("ice cream")).concat(First("Billy"));
console.log('resultOfASimpleFirst is: ', resultOfASimpleFirst);
console.log('');

// -------------------------------------------------- CHAPTER 7 --------------------------------------------------------
console.log('// -------------------------------------------------- CHAPTER 7 ---------------------------------------' +
    '-----------------');
// url: https://egghead.io/lessons/javascript-semigroup-examples

const {Map, List} = require('immutable-ext');

const acct1 = Map({name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin']});
const acct2 = Map({name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby']});

const resultOfConcatOnMap = acct1.concat(acct2);
console.log('resultOfConcatOnMap is: ', resultOfConcatOnMap.toJS());
console.log('');

// -------------------------------------------------- CHAPTER 8 --------------------------------------------------------
console.log('// -------------------------------------------------- CHAPTER 8 ---------------------------------------' +
    '-----------------');
// url: https://egghead.io/lessons/javascript-failsafe-combination-using-monoids

const sum = xs => xs.reduce((acc, x) => acc + x, 0);
const all = xs => xs.reduce((acc, x) => acc && x, true);
const first = xs => xs.reduce((acc, x) => acc);

// Works
console.log(first([1, 2]));

// Blows
// console.log(first([]));

// -------------------------------------------------- CHAPTER 9 --------------------------------------------------------
console.log('// -------------------------------------------------- CHAPTER 9 ---------------------------------------' +
    '-----------------');
// url: https://egghead.io/lessons/javascript-a-curated-collection-of-monoids-and-their-uses

// Commented due to already declared above
// const Sum = x =>
//     ({
//         x,
//         concat : o => Sum(x + o.x)
//     });
//
// Sum.empty = () => Sum(0);

// Commented due to already declared above
// const All = x =>
//     ({
//         x,
//         concat : ({x: y}) => All(x && y)
//     });
//
// All.empty = () => All(true);

const Product = x => ({
    x,
    concat: ({x: y}) => Product(x * y)
});

Product.empty = () => Product(1);

const Any = x => ({
    x,
    concat: ({x: y}) => Any(x || y)
});

Any.empty = () => Any(false);

const Max = x => ({
    x,
    concat: ({x: y}) => Max(x > y ? x : y)
});

Max.empty = () => Max(-Infinity);

const Min = x => ({
    x,
    concat: ({x: y}) => Max(x < y ? x : y)
});

Min.empty = () => Max(Infinity);

// const stats = List.of(
//     {page: 'Home', views: 40},
//     {page: 'Home', views: 10},
//     {page: 'Home', views: 4}
// );
//
// const resultOfFoldMap = stats.foldMap(x =>
//     fromNullable(x.views)
//         .map(Sum), Right(Sum(0))
// );
//
// console.log('resultOfFoldMap is: ', stats);

const Pair = (x, y) => ({
    x,
    y,
    concat: ({x: x1, y: y1}) => Pair(x.concat(x1), y.concat(y1))
});

// -------------------------------------------------- CHAPTER 10 -------------------------------------------------------
console.log('// -------------------------------------------------- CHAPTER 10 --------------------------------------' +
    '-----------------');
// url: https://egghead.io/lessons/javascript-unboxing-things-with-foldable

const resultOfExampleFoldOnList = List.of(Sum(1), Sum(2), Sum(3))
    .fold(Sum.empty());

console.log('resultOfExampleFoldOnList is: ', resultOfExampleFoldOnList);
console.log('');

const resultOfExampleFoldOnMap = Map({brian: 3, sara: 5})
    .map(Sum)
    .fold(Sum.empty());

console.log('resultOfExampleFoldOnMap is: ', resultOfExampleFoldOnMap);
console.log('');

const resultOfExampleFoldOnMapUsingFoldMap = Map({brian: 3, sara: 5})
    .foldMap(Sum, Sum.empty());

console.log('resultOfExampleFoldOnMapUsingFoldMap is: ', resultOfExampleFoldOnMapUsingFoldMap);
console.log('');

const resultOfFoldMapOnAList = List.of(1, 2, 3).foldMap(Sum, Sum.empty());
console.log('resultOfFoldMapOnAList is: ', resultOfFoldMapOnAList);
console.log('');

