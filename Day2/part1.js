import fs from "fs";

const csvContent = fs.readFileSync('Day2/Day2.csv', 'utf8');
const rows = csvContent.trim().split('\n');

let total = 0;
for (const row of rows) {
    const numbers = row.split(' ');
    let safe = isSafe(numbers)
    if(safe){
        total++;
    }

}

function isSafe(numbers){
    let diff = numbers[0] - numbers[1]
    let safe = true
    for(let i = 1; i < numbers.length - 1; i++) {
        const newDiff = numbers[i] - numbers[i+1]; //2
        if((diff > 0 && newDiff < 0) || (diff < 0 && newDiff > 0)){
            safe = false;
            diff = newDiff;
            break
        }
        else if(Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            safe = false;
            diff = newDiff;
            break
        }
        else if(Math.abs(newDiff) < 1 || Math.abs(newDiff) > 3) {
            safe = false;
            diff = newDiff;
            break
        }
        diff = newDiff;
    }
    return safe;
}
console.log(total);

