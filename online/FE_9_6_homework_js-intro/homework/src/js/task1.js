const amount = parseFloat(prompt('Input amount of money', '0'));
const discount = parseFloat(prompt('Input the discount', '0'));
let outSample;
const sample = (amount, discount, decreasePrice, benefit) => `
Price without discount: ${+amount.toFixed(2)}
Discount: ${+discount.toFixed(2)}
Price with discount: ${+decreasePrice.toFixed(2)}
Saved: ${+benefit.toFixed(2)}
`;

if (amount < 0 || discount <= 0 || discount > 100 || isNaN(amount, discount)){
  outSample = 'Invalid data';
}else{
  const benefit = amount * discount / 100;
  const decreasePrice = amount - benefit;
  outSample = sample(amount, discount, decreasePrice, benefit);
}
console.log(outSample);