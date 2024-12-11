import fs from "fs";

const csvContent = fs.readFileSync('Day11.txt', 'utf8');
let arrayTotal = csvContent.trim().split(' ');
let total = 0

let count = 0;
const memo = memoize(getPermutation)

for(let arr of arrayTotal ){
    count += getPermutation(arr, 75);
}
console.log(count);

function getPermutation(number, counter){
    //console.log("Number", number, counter)
    if(counter === 0){
        return 1
    }
    let len = number.length
    if(number === '0'){
        //count++
        //console.log('IsZero', number)
        return memo('1', counter-1);
    }else if(len % 2 === 0){
        //count+=1
        const left = number.slice(0,(number.length/2));
        //console.log('LEFT', left)
        let leftNumber = checkIfZeros(left)
        //console.log('LEFT:',left)
        const right = number.slice((number.length/2))
        //console.log('Right:',right)
        let rightNumber = checkIfZeros(right)
        return memo(leftNumber,counter-1) + memo(rightNumber,counter-1)

    } else {
        //count++
        //console.log('Multiply:',number)
        return memo((Number(number) * 2024).toString(),counter- 1)
    }
}
function memoize(func) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    };
}

function checkIfZeros(value){
    let newValue = value
    for(let i = 0; i < value.length; i++){
        if(i === value.length-1){
            return newValue;
        }
        if(value[i] === '0'){
            newValue = value.slice(i+1);
        } else {
            return newValue
        }
    }

}
