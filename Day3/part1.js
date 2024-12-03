import fs from "fs";
const csvContent = fs.readFileSync('Day3/Day3.csv', 'utf8');
let total = 0;
for(let i=0; i<csvContent.length; i++){
    const slice = csvContent.slice(i);
    const numbers = checkMulti(slice);
    if(numbers){
        total += numbers.num1 * numbers.num2;
    }
}
function checkMulti(slice){
    if(slice.slice(0,4) !== 'mul('){
        return false;
    }
    const num1 = getNumber(slice.slice(4))
    let pointer = 3 + num1.length;
    if(!num1){
        return false
    }
    if(slice[pointer+1] !== ','){
        return false
    }
    const num2 = getNumber(slice.slice(pointer+2))
    pointer = pointer + num2.length + 1
    if(!num2){
        return false
    }
    if(slice[pointer + 1] !== ')'){
        return false
    }
    return {num1,num2}
}
function getNumber(value){
    if(isNaN(value[0])){
        return false;
    }
    for(let i=1; i<value.length; i++){
        if(isNaN(value.slice(0,i))){
            return value.slice(0,i-1)
        }
    }
}

console.log(total);




