var inputs = process.argv.slice(2);
var result = inputs.map((a) => a[0].toUpperCase()).reduce((res, a) => res + a);

console.log(result);