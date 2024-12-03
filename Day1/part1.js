import fs from "fs";

const csvContent = fs.readFileSync('Day1/Day1.csv', 'utf8');
const rows = csvContent.trim().split('\n');

const arr1 = [];
const arr2 = [];

for (const row of rows) {
    const [num1, num2] = row.split('   ');
    arr1.push(Number(num1));
    arr2.push(Number(num2));
}

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);


let total = 0
for(let i = 0; i < arr1.length; i++) {
    total += Math.abs(arr1[i] - arr2[i]);
}
console.log(total);
