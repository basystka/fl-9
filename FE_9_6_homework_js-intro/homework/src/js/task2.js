const a = parseFloat(prompt('Input length a:', '0'));
const b = parseFloat(prompt('Input length b:', '0'));
const angle = parseFloat(prompt('Input angle:', '0'));
const allAngle = 180;
let outSample;
const sample = (c, area, perimeter) => `
c length: ${+c.toFixed(2)} 
Triangle square: ${+area.toFixed(2)}
Triangle perimeter: ${+perimeter.toFixed(2)}
`;

if(a <= 0 || b <= 0 || angle <= 0 || angle > allAngle || isNaN(a, b, angle)){
    outSample ='Invalid data';
}else{
    const c = Math.sqrt(a*a + b*b - 2 * a * b * Math.cos(Math.PI / allAngle * parseFloat(angle)));
    const perimeter = a + b + c;
    const halfPerimeter = perimeter/2;
    const area = Math.sqrt(halfPerimeter * ((halfPerimeter - a) * (halfPerimeter - b) * (halfPerimeter - c))); 
	outSample = sample(c, area, perimeter);	
}
console.log(outSample);