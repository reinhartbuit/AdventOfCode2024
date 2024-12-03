import fs from "fs";

const csvContent = fs.readFileSync('Day1/Day1.csv', 'utf8');
const rows = csvContent.trim().split('\n');

const arr1 = [];
const arr2 = [];

for (const row of rows) {
    const [num1, num2] = row.split('   ');
    arr1.push(Number(num1)); // Convert to number if needed
    arr2.push(Number(num2));
}


let total = 0
for(let i = 0; i < arr1.length; i++) {
    let count = 0
    for (let j = 0; j < arr2.length; j++) {
        if(arr1[i] === arr2[j]) {
            count++
        }
    }
    total += arr1[i] * count
}
console.log(total);
