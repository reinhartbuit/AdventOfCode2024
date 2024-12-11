import fs from "fs";

const csvContent = fs.readFileSync('Day11.txt', 'utf8');
let arrayTotal = csvContent.trim().split(' ');
let total = 0

let count = 0;

for(let arr of arrayTotal ){
    count++
    getPermutation(arr, 0);

}
console.log(count);

function getPermutation(number, counter){
    //console.log("Number", number, counter)
    if(counter === 25){
        return
    }
    let len = number.length
    let newNumber = number
    if(number === '0'){
        //count++
        //console.log('IsZero', number)
        getPermutation('1', counter+1);
    }else if(len % 2 === 0){
        count+=1
        const left = number.slice(0,(number.length/2));
        //console.log('LEFT', left)
        newNumber = checkIfZeros(left)
        //console.log('LEFT:',left)
        getPermutation(newNumber,counter+1)

        const right = number.slice((number.length/2))
        //console.log('Right:',right)
        newNumber = checkIfZeros(right)
        getPermutation(newNumber,counter+1)
    } else {
        //count++
        //console.log('Multiply:',number)
        getPermutation((Number(number) * 2024).toString(),counter+ 1)
    }
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
